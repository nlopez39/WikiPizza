import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation addBlogPost($title: String!, $content: String!) {
    addBlogPost(title: $title, content: $content) {
      _id
      title
      content
      author {
        _id
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
        email
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
        firstname
        lastname
        email
        password
      }
    }
  }
`;
