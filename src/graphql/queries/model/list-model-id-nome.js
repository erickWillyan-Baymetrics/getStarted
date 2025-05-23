import { gql } from "@apollo/client";

export const LIST_MODEL_ID_NOME = gql`
  query {
    modelo {
      mod_id
      mod_nome
    }
  }
`;
