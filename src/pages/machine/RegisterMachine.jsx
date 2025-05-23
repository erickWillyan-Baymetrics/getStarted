import Header from "../../components/header";
import FormFieldSelectBox from "../../components/form-field-select-box";
import FormFieldTextBox from "../../components/form-field-text-box";
import FormRegister from "../../components/form-register";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Button from "../../components/button-register";
import toast, { Toaster } from "react-hot-toast";
import FormFieldTextarea from "../../components/form-field-textarea";
import BackButton from "../../components/back-button";
import { LIST_OPERATING_SYSTEM_ID_NOME } from "../../graphql/queries/operatingSystem/list-operating-system-id-nome";
import { LIST_MODEL_ID_NOME } from "../../graphql/queries/model/list-model-id-nome";
import { LIST_USER_ID_EMAIL } from "../../graphql/queries/user/list-user-id-email";
import { CREATE_MACHINE } from "../../graphql/mutations/machine/create-machine";
import { useMutation, useQuery } from "@apollo/client";
import LoadingPage from "../../components/loadingComponent";

export default function RegisterMachine() {
  const { register, reset, handleSubmit } = useForm();
  const [users, setUsers] = useState([]);
  const [operatingSystem, setOperatingSystem] = useState([]);
  const [models, setModel] = useState([]);
  const {
    data: dataOperatingSystem,
    loading: loadingOperatingSystem,
    error: errorOperatingSystem,
  } = useQuery(LIST_OPERATING_SYSTEM_ID_NOME);
  const {
    data: dataModel,
    loading: loadingModel,
    error: errorModel,
  } = useQuery(LIST_MODEL_ID_NOME);
  const {
    data: dataUser,
    loading: loadingUser,
    error: errorUser,
  } = useQuery(LIST_USER_ID_EMAIL);
  const [CreateMachine] = useMutation(CREATE_MACHINE);

  useEffect(() => {
    if (dataOperatingSystem && dataOperatingSystem.sistema_operacional)
      setOperatingSystem(dataOperatingSystem.sistema_operacional);
    if (dataModel && dataModel.modelo) setModel(dataModel.modelo);
    if (dataUser && dataUser.users) setUsers(dataUser.users);
  }, [dataModel, dataOperatingSystem, dataUser]);

  if (loadingOperatingSystem || loadingModel || loadingUser) {
    return <LoadingPage />;
  }

  const addMachine = async (values) => {
    try {
      if (!values.fk_users_id) {
        delete values.fk_users_id;
      }

      values.maq_serial = parseInt(values.maq_serial);
      values.maq_patrimonio = parseInt(values.maq_patrimonio);
      values.fk_modelo_id = parseInt(values.fk_modelo_id);
      values.fk_sistema_operacional_id = parseInt(
        values.fk_sistema_operacional_id
      );

      values.maq_status = values.maq_status || "ativo";

      await CreateMachine({ variables: values });

      toast.success("Máquina cadastrada");
      reset();
    } catch (error) {
      console.log(error);
      console.log(values);
      toast.error("Máquina não cadastrada");
    }
  };
  return (
    <>
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      <div className="mt-4 ml-4">
        <BackButton to="/" />
      </div>
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
          selectedText="Selecione um sistema operacional"
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
          selectedText="Selecione um modelo"
          title="Modelo"
        />
        <FormFieldSelectBox
          name="fk_users_id"
          fieldId="id"
          fieldName="email"
          register={register}
          options={users}
          size="w-full"
          selectedText="Selecione um usuário"
          title="Usuário (opcional)"
        />

        <FormFieldTextarea
          name="maq_observacoes"
          register={register}
          required={false}
          placeholder="Observações"
          size="w-full"
          height="h-24"
          title="Observações"
        />

        <input
          type="checkbox"
          name="inativo"
          value="inativo"
          className="mt-2"
          {...register("maq_status", { required: false })}
        />
        <label
          className=" ml-2 text-base text-gray-600 font-bold"
          htmlFor="inativo"
        >
          Inativo
        </label>
        <Button text="Cadastrar" />
      </FormRegister>
    </>
  );
}
