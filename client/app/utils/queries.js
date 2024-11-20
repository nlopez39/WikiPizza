import { gql } from "@apollo/client";

export const GET_POST = gql`
  query GetPosts {
    blogPosts {
      _id
      title
      content
      author {
        _id
      }
    }
  }
`;
