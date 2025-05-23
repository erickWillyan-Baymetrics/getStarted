import { gql } from "@apollo/client";
export const UPDATE_MACHINE = gql`
  mutation (
    $maq_id: Int!
    $fk_sistema_operacional_id: Int
    $maq_nome: String
    $maq_observacoes: String
    $maq_status: String
    $fk_users_id: uuid
  ) {
    update_maquina_by_pk(
      pk_columns: { maq_id: $maq_id }
      _set: {
        fk_sistema_operacional_id: $fk_sistema_operacional_id
        fk_users_id: $fk_users_id
        maq_nome: $maq_nome
        maq_observacoes: $maq_observacoes
        maq_status: $maq_status
      }
    ) {
      sistema_operacional {
        sto_id
      }
    }
  }
`;
