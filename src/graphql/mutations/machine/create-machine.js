import { gql } from "@apollo/client";

export const CREATE_MACHINE = gql`
  mutation (
    $fk_modelo_id: Int!
    $fk_sistema_operacional_id: Int!
    $fk_users_id: uuid
    $maq_nome: String!
    $maq_observacoes: String
    $maq_patrimonio: Int!
    $maq_serial: Int!
    $maq_status: String
  ) {
    insert_maquina_one(
      object: {
        fk_modelo_id: $fk_modelo_id
        fk_sistema_operacional_id: $fk_sistema_operacional_id
        fk_users_id: $fk_users_id
        maq_nome: $maq_nome
        maq_observacoes: $maq_observacoes
        maq_patrimonio: $maq_patrimonio
        maq_serial: $maq_serial
        maq_status: $maq_status
      }
    ) {
      maq_id
    }
  }
`;
