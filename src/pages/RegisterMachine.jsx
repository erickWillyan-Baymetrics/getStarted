import Header from "../components/header";
import LabelForm from "../components/LabelForm";
import FormFieldSelectBox from "../components/form-field-select-box";
import FormFieldTextBox from "../components/form-field-text-box";
import FormRegister from "../components/form-register";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNhostClient } from "@nhost/react";
import Button from "../components/button-register";
import toast, { Toaster } from "react-hot-toast";

const getUsers = `
query {
  users {
    id
    email
  }
}
`;

const getOperatingSystem = `
  query{
  sistema_operacional(where: {sto_status: {_eq: "ativo"}}) {
    sto_id
    sto_nome
  }
}
`;

const getModel = `
  query{
   modelo{
    mod_id
    mod_nome
  }
}
`;

const createMachine = `
mutation(
$fk_modelo_id: Int!,
$fk_sistema_operacional_id: Int!,
$fk_users_id: uuid, 
  $maq_nome: String!,
   $maq_observacoes: String,
    $maq_patrimonio: Int!,
     $maq_serial: Int!,
      $maq_status: String
      ) {
  insert_maquina_one(object: {fk_modelo_id: $fk_modelo_id, fk_sistema_operacional_id: $fk_sistema_operacional_id, fk_users_id: $fk_users_id, maq_nome: $maq_nome, maq_observacoes: $maq_observacoes, maq_patrimonio: $maq_patrimonio, maq_serial: $maq_serial, maq_status: $maq_status}) {
    maq_id
  }
}
`;
export default function RegisterMachine() {
  const { register, reset, handleSubmit } = useForm();
  const [users, setUsers] = useState([]);
  const [operatingSystem, setOperatingSystem] = useState([]);
  const [models, setModel] = useState([]);
  const nhostClient = useNhostClient();

  useEffect(() => {
    const getUsersFunction = async () => {
      const response = await nhostClient.graphql.request(getUsers);

      setUsers(response.data.users);
    };

    const getOperatingSystemFunction = async () => {
      const response = await nhostClient.graphql.request(getOperatingSystem);

      setOperatingSystem(response.data.sistema_operacional);
    };

    const getModelsFunction = async () => {
      const response = await nhostClient.graphql.request(getModel);

      setModel(response.data.modelo);
    };

    getUsersFunction();
    getOperatingSystemFunction();
    getModelsFunction();
  }, []);

  const addMachine = async (values) => {
    if (values.fk_user_id == "Sem usuário") {
      values.fk_user_id = null;
    }

    values.maq_serial = parseInt(values.maq_serial);
    values.maq_patrimonio = parseInt(values.maq_patrimonio);
    values.fk_modelo_id = parseInt(values.fk_modelo_id);
    values.fk_sistema_operacional_id = parseInt(
      values.fk_sistema_operacional_id
    );

    const { data, error } = await nhostClient.graphql.request(
      createMachine,
      values
    );
    if (error) {
      console.log(error);
    }
    toast.success("Máquina cadastrada");
    reset();
  };
  return (
    <>
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      <Header />
      <FormRegister
        onSubmit={handleSubmit(addMachine)}
        title="Cadastrar máquina"
        titlePostion="center"
        weight="w-96"
        titleSize="xl"
      >
        <FormFieldTextBox
          name="maq_nome"
          register={register}
          required={true}
          placeholder="Digite o nome da máquina"
          size="w-full"
          title="Nome da máquina"
        />
        <FormFieldTextBox
          name="maq_serial"
          register={register}
          required={true}
          placeholder="Digite o número serial"
          size="w-full"
          title="Número Serial"
        />
        <FormFieldTextBox
          name="maq_patrimonio"
          register={register}
          required={true}
          placeholder="Digite o número do patrimônio"
          size="w-full"
          title="Número do patrimônio"
        />
        <FormFieldSelectBox
          name="fk_sistema_operacional_id"
          fieldId="sto_id"
          fieldName="sto_nome"
          register={register}
          options={operatingSystem}
          required={true}
          size="w-full"
          disbableText="Selecione um sistema operacional"
          title="Sistema operacional"
        />
        <FormFieldSelectBox
          name="fk_modelo_id"
          fieldId="mod_id"
          fieldName="mod_nome"
          register={register}
          options={models}
          required={true}
          size="w-full"
          disbableText="Selecione um modelo"
          title="Modelo"
        />
        {/* <FormFieldSelectBox
          name="fk_modelo_id"
          fieldId="mod_id"
          fieldName="mod_nome"
          register={register}
          options={models}
          required={true}
          size="w-full"
          disbableText="Selecione um modelo"
          title="Modelo"
        /> */}
        <FormFieldSelectBox
          name="fk_users_id"
          fieldId="id"
          fieldName="email"
          register={register}
          options={users}
          required={true}
          size="w-full"
          disbableText="Selecione um usuário"
          title="Usuário (opcional)"
        />
        <input
          type="checkbox"
          name="ativo"
          value="ativo"
          className="mt-2"
          {...register("maq_status", { required: false })}
        />
        <label
          className=" ml-2 text-base text-gray-600 font-semibold"
          htmlFor="ativo"
        >
          Ativo
        </label>
        <Button text="Cadastrar" />
      </FormRegister>
    </>
  );
}
