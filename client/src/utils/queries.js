import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      savedBooks{
        _id:ID
        authors: [String]!
        description:String!
        bookId:String!
        title:String!
        image:String!
        link:String!
      }
    }
  }
`;

