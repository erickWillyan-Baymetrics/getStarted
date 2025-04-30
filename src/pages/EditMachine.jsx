import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNhostClient } from "@nhost/react";

const getUser = `
query($id: Int!) {
    maquina(where: { maq_id: { _eq: $id } }) {
      maq_id
      maq_nome
      maq_serial
      maq_marca
      maq_modelo
      maq_patrimonio
      maq_sistema_operacional
      fk_user_id
    }
  }
`;

export default function EditMachine() {
  const [user, setUser] = useState([]);
  const { id } = useParams();
  const nhostClient = useNhostClient();

  useEffect(() => {
    const getDataUser = async (id) => {
      const { data, error } = await nhostClient.graphql.request(getUser, {
        id: id,
      });

      if (error) {
        console.log(error);
        return;
      }

      console.log(data);
      setUser(data);
    };
  }, [id]);
  return (
    <>
      <Header />
      <div>
        <p>O id é: {id}</p>
      </div>
    </>
  );
}
