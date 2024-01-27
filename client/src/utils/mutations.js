import { gql } from '@apollo/client';

export const CREATE_MATCHUP = gql`
  mutation addUser(username: String!, email: String!, password: String!) {
    addUser(username: $username, email: $email, password: $password){
        token
        user {
          _id
          username
        }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;