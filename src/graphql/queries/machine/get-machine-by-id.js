import { gql } from "@apollo/client";

export const GET_MACHINE_BY_ID = gql`
  query ($maq_id: Int!) {
    maquina(where: { maq_id: { _eq: $maq_id } }) {
      maq_nome
      maq_observacoes
      maq_patrimonio
      maq_serial
      maq_status
      modelo {
        mod_id
        mod_nome
      }
      sistema_operacional {
        sto_id
        sto_nome
      }
      users {
        id
        email
      }
    }
  }
`;
