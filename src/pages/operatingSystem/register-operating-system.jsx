import Header from "../../components/header";
import FormRegister from "../../components/form-register";
import { useNhostClient } from "@nhost/react";
import { useForm } from "react-hook-form";
import Button from "../../components/button-register";
import FormFieldTextBox from "../../components/form-field-text-box";
import toast, { Toaster } from "react-hot-toast";

const createOperatingSystem = `
mutation($sto_nome: String!) {
  insert_sistema_operacional_one(object: {sto_nome: $sto_nome}) {
    sto_id
    sto_nome
    sto_status
  }
}

`;

export default function RegisterOperatingSystem() {
  const { register, reset, handleSubmit } = useForm();
  const nhostClient = useNhostClient();

  const insertOperatingSystem = async (values) => {
    const { error } = await nhostClient.graphql.request(
      createOperatingSystem,
      values
    );

    if (error) {
      toast.error(`Erro: ${error[0].message}`);
    } else {
      toast.success("Sistema Operacional cadastrado");
    }

    reset();
  };
  return (
    <>
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      <Header />
      <FormRegister
        onSubmit={handleSubmit(insertOperatingSystem)}
        weight="w-96"
        titlePostion="center"
        titleSize="xl"
        title="Cadastrar Sistema Operacional"
      >
        <FormFieldTextBox
          name="sto_nome"
          placeholder="Digite o nome do sistema operacional"
          register={register}
          required={true}
          size="w-full"
          title="Nome do sistema operacional"
        />
        <Button text="Cadastrar" />
      </FormRegister>
    </>
  );
}
