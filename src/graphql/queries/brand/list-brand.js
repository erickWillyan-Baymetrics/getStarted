import { gql } from "@apollo/client";

export const LIST_BRAND = gql`
  query {
    marca {
      mar_id
      mar_nome
    }
  }
`;
