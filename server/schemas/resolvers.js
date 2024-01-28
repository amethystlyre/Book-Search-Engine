const { User } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("savedBooks");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("savedBooks");
    },
    me: async (parent, args, context) => {
      if (context.user) {
        console.log("context.user:", context.user);
        return User.findOne({ _id: context.user._id }).populate("savedBooks");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },    
    saveBook: async (parent, args, context) => {

      if (context.user) {
        // const thought = await Thought.create({
        //   thoughtText,
        //   thoughtAuthor: context.user.username,
        // });

        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: {...args.book} } },
          { new: true}
        ).populate("savedBooks");
        //console.log("args:",args);
        //console.log("context.user._id:",context.user._id);
        
      }

      throw AuthenticationError;
      ('You need to be logged in!');
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        // const thought = await Thought.findOneAndDelete({
        //   _id: thoughtId,
        //   thoughtAuthor: context.user.username,
        // });

        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: {bookId : bookId} } },
          { new: true }
        );

        return user;
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
