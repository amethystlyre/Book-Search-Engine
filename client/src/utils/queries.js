import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      savedBooks {
        bookId
        description
        image
        link
        title
        _id
        authors
      }
    }
  }
`;

