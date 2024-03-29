const typeDefs =`
    type User{
        _id: ID
        username: String!
        email: String!
        password: String!
        savedBooks: [Book]
    }

    type Book{
        _id:ID
        authors: [String]
        description:String
        bookId:String
        title:String
        image:String
        link:String
    }
     
    input BookInput{
        title:String
        authors: [String]
        description:String
        bookId:String        
        image:String
        link:String

    }

    
    type Auth {
        token: ID!
        user: User
    }

    type Query{
        users: [User]
        user(username: String!): User
        me: User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        saveBook(book:BookInput!): User
        removeBook(bookId:String!): User
      }


`;

module.exports = typeDefs;