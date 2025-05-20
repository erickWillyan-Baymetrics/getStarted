import { gql } from "@apollo/client";

export const CREATE_MODEL = gql`
  mutation ($mod_nome: String!, $fk_marca_id: Int!) {
    insert_modelo_one(
      object: { mod_nome: $mod_nome, fk_marca_id: $fk_marca_id }
    ) {
      mod_id
      mod_nome
      fk_marca_id
    }
  }
`;
