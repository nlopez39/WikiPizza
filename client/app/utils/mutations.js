import { gql } from "@apollo/client";

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
export const SIGNUP_USER = gql`
  mutation signup(
    $firstname: String!
    $lastname: String!
    $email: String!
    $password: String!
  ) {
    signup(
      firstname: $firstname
      lastname: $lastname
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        email
        username
      }
    }
  }
`;
