import { gql } from "@apollo/client";

export const CREATE_OPERATING_SYSTEM = gql`
  mutation ($sto_nome: String!) {
    insert_sistema_operacional_one(object: { sto_nome: $sto_nome }) {
      sto_id
      sto_nome
      sto_status
    }
  }
`;
