import { gql } from "@apollo/client";

export const LIST_MACHINE = gql`
  query {
    maquina(order_by: { maq_nome: asc }) {
      maq_id
      maq_nome
      maq_serial
    }
  }
`;
