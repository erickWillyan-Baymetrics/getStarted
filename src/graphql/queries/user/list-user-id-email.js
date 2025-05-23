import { gql } from "@apollo/client";

export const LIST_USER_ID_EMAIL = gql`
  query {
    users {
      id
      email
    }
  }
`;
