import { gql } from "@apollo/client";

export const CREATE_BRAND = gql`
  mutation ($mar_nome: String!) {
    insert_marca_one(object: { mar_nome: $mar_nome }) {
      mar_id
      mar_nome
    }
  }
`;
