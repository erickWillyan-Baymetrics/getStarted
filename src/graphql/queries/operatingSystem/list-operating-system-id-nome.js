import { gql } from "@apollo/client";

export const LIST_OPERATING_SYSTEM_ID_NOME = gql`
  query {
    sistema_operacional(where: { sto_status: { _eq: "ativo" } }) {
      sto_id
      sto_nome
    }
  }
`;
