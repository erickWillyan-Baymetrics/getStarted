import Header from "../components/Header";
import LabelForm from "../components/LabelForm";
import TextBox from "../components/TextBox";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNhostClient } from "@nhost/react";
import Button from "../components/Button";

const getUsers = `
query {
  users {
    id
    email
  }
}
`;

const createMachine = `
mutation(
  $maq_marca: String!,
  $maq_modelo: String!,
  $maq_nome: String!,
  $maq_patrimonio: Int!,
  $maq_sistema_operacional: String!,
  $maq_serial: Int!,
  $fk_user_id: uuid!    
) {
  insert_maquina_one(object: {
    maq_marca: $maq_marca,
    maq_modelo: $maq_modelo,
    maq_nome: $maq_nome,
    maq_patrimonio: $maq_patrimonio,
    maq_sistema_operacional: $maq_sistema_operacional,
    maq_serial: $maq_serial,
    fk_user_id: $fk_user_id   
  }) {
    maq_id
  }
}
`;
export default function RegisterMachine() {
  const { register, reset, handleSubmit } = useForm();
  const [users, setUsers] = useState([]);
  const nhostClient = useNhostClient();

  useEffect(() => {
    const getUsersFunction = async () => {
      const response = await nhostClient.graphql.request(getUsers);

      setUsers(response.data.users);
    };

    getUsersFunction();
  }, []);

  const addMachine = async (values) => {
    const { data, error } = await nhostClient.graphql.request(
      createMachine,
      values
    );
    if (error) {
      console.log(error);
    }
    console.log(data);
    reset();
  };
  return (
    <>
      <Header />
      <form
        onSubmit={handleSubmit(addMachine)}
        className="flex flex-col m-auto mt-6 bg-white w-96 items-center gap-4  px-5 pb-8 rounded-lg"
      >
        <div className="flex flex-col w-full items-center gap-2">
          <h6 className="text-blue-500 font-bold text-xl mt-4 mb-4 select-none">
            Cadastrar máquina
          </h6>
          <LabelForm title="Nome da máquina" />
          <TextBox
            placeholder="Insira o nome da máquina"
            register={register}
            required={true}
            name="maq_nome"
          />
          <LabelForm title="Número serial" />
          <TextBox
            placeholder="Insira o número serial"
            register={register}
            required={true}
            name="maq_serial"
          />
          <LabelForm title="Patrimônio" />
          <TextBox
            placeholder="Insira o número do patrimônio"
            register={register}
            required={true}
            name="maq_patrimonio"
          />
          <LabelForm title="Nome da marca" />
          <TextBox
            placeholder="Insira o nome da marca"
            register={register}
            required={true}
            name="maq_marca"
          />
          <LabelForm title="Nome do modelo" />
          <TextBox
            placeholder="Insira o nome do modelo"
            register={register}
            required={true}
            name="maq_modelo"
          />
          <LabelForm title="Sistema operacional" />
          <TextBox
            placeholder="Insira o sistema operacional"
            register={register}
            required={true}
            name="maq_sistema_operacional"
          />
          <LabelForm title="Usuário" />

          <select
            {...register("fk_user_id", { required: true })}
            className="py-2 rounded-sm w-11/12 px-3 font-bold text-sm bg-stone-200 select-none"
          >
            <option value="">Selecione um usuário</option>
            {users.map((user) => {
              return (
                <option key={user.id} value={user.id}>
                  {user.email}
                </option>
              );
            })}
          </select>
          <Button type="submit" texto="Cadastrar" />
        </div>
      </form>
    </>
  );
}
