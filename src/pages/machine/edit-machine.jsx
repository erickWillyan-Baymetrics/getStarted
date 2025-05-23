import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import FormRegister from "../../components/form-register";
import BackButton from "../../components/back-button";
import FormFieldTextBox from "../../components/form-field-text-box";
import { GET_MACHINE_BY_ID } from "../../graphql/queries/machine/get-machine-by-id";
import { LIST_OPERATING_SYSTEM_ID_NOME } from "../../graphql/queries/operatingSystem/list-operating-system-id-nome";
import { useQuery, useMutation } from "@apollo/client";
import FormFieldTextarea from "../../components/form-field-textarea";
import Button from "../../components/button-register";
import FormFieldSelectBox from "../../components/form-field-select-box";
import { UPDATE_MACHINE } from "../../graphql/mutations/machine/update-machine";
import { LIST_USER_ID_EMAIL } from "../../graphql/queries/user/list-user-id-email";
import toast, { Toaster } from "react-hot-toast";
import LoadingPage from "../../components/loadingComponent";

export default function EditMachine() {
  const { id } = useParams();
  const {
    data: dataQueryMachine,
    loading: loadingQueryMachine,
    error: errorQueryMachine,
  } = useQuery(GET_MACHINE_BY_ID, {
    fetchPolicy: "network-only",
    variables: { maq_id: id },
  });

  const [updateMachine] = useMutation(UPDATE_MACHINE, {
    refetchQueries: [GET_MACHINE_BY_ID],
  });
  const {
    data: dataQueryOperatingSystem,
    loading: loadingQueryOperatingSystem,
  } = useQuery(LIST_OPERATING_SYSTEM_ID_NOME, { fetchPolicy: "network-only" });
  const { data: dataQueryUser, loading: loadingQueryUser } = useQuery(
    LIST_USER_ID_EMAIL,
    { fetchPolicy: "network-only" }
  );
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (dataQueryMachine) {
      reset({
        maq_nome: dataQueryMachine.maquina[0].maq_nome,
        maq_serial: dataQueryMachine.maquina[0].maq_serial,
        maq_patrimonio: dataQueryMachine.maquina[0].maq_patrimonio,
        mod_modelo: dataQueryMachine.maquina[0].modelo.mod_nome,
        sto_nome: dataQueryMachine.maquina[0].sistema_operacional.sto_nome,
        email: dataQueryMachine.maquina[0].users?.email || null,
        maq_observacoes: dataQueryMachine.maquina[0].maq_observacoes,
        fk_modelo_id: dataQueryMachine.maquina[0].modelo.mod_id,
        fk_sistema_operacional_id:
          dataQueryMachine.maquina[0].sistema_operacional.sto_id,
        fk_users_id: dataQueryMachine.maquina[0].users?.id || null,
      });
    }
  }, [dataQueryMachine, reset]);

  if (loadingQueryMachine || loadingQueryOperatingSystem || loadingQueryUser)
    return <LoadingPage />;

  console.log("machine", dataQueryMachine);
  console.log("so", dataQueryOperatingSystem);

  const editMachine = async (values) => {
    try {
      console.log("Values não", values);
      values.maq_serial = parseInt(values.maq_serial);
      values.maq_patrimonio = parseInt(values.maq_patrimonio);
      values.fk_modelo_id = parseInt(values.fk_modelo_id);
      values.fk_sistema_operacional_id = parseInt(
        values.fk_sistema_operacional_id
      );
      if (!values.fk_users_id) {
        delete values.fk_users_id;
      }

      values.maq_status = values.maq_status || "ativo";
      let information = {
        ...values,
        maq_id: parseInt(id),
      };
      console.log("infroma", information);
      await updateMachine({
        variables: information,
      });

      toast.success("Máquina editada");
      reset();
    } catch (error) {
      console.log("Erro:", error);
      toast.error("Não foi possivel editar");
    }
  };

  return (
    <>
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      <div className="mt-4 ml-4">
        <BackButton to={`/informationMachine/${id}`} />
      </div>
      <FormRegister
        title="Editar máquina"
        titlePostion="center"
        titleSize="xl"
        weight="w-96"
        onSubmit={handleSubmit(editMachine)}
      >
        <FormFieldTextBox
          name="maq_nome"
          register={register}
          title="Nome da máquina"
        />
        <FormFieldTextBox
          name="maq_serial"
          readOnly={true}
          register={register}
          title="Número serial"
        />

        <FormFieldTextBox
          name="maq_patrimonio"
          register={register}
          readOnly={true}
          title="Patrimonio"
        />
        <FormFieldTextBox
          name="mod_modelo"
          readOnly={true}
          register={register}
          title="Modelo"
        />
        <FormFieldSelectBox
          name="fk_sistema_operacional_id"
          options={dataQueryOperatingSystem.sistema_operacional}
          fieldName="sto_nome"
          title="Sistema Operacional"
          fieldId="sto_id"
          register={register}
          disableText={dataQueryMachine.maquina[0].sistema_operacional.sto_nome}
        />
        <FormFieldSelectBox
          name="fk_users_id"
          options={dataQueryUser.users}
          fieldName="email"
          title="Usuário"
          fieldId="id"
          register={register}
          disableText={
            dataQueryMachine?.maquina?.[0]?.users?.email || "Sem usuário"
          }
        />

        <FormFieldTextarea
          name="maq_observacoes"
          register={register}
          title="Observações"
        />
        <Button text="Editar" />
      </FormRegister>
    </>
  );
}
