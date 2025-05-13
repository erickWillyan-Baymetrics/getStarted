//Erick Willyan dos Santos Cruz 08/05/2025
//Função: Página com o objetivo de realizar o cadastro de uma marca.
import FormRegister from "../../components/form-register";
import Header from "../../components/header";
import FormFieldTextBox from "../../components/form-field-text-box";
import Button from "../../components/button-register";
import { useForm } from "react-hook-form";
import { useNhostClient } from "@nhost/react";
import toast, { Toaster } from "react-hot-toast";

const createBrand = `
  mutation($mar_nome: String!) {
  insert_marca_one(object: {mar_nome: $mar_nome}) {
    mar_id
    mar_nome
  }
}
`;

export default function RegisterBrand() {
  const { register, reset, handleSubmit } = useForm();
  const nhostClient = useNhostClient();

  const insertBrand = async (values) => {
    const { error } = await nhostClient.graphql.request(createBrand, values);

    if (error) {
      toast.error(`Erro: ${error[0].message}`);
    } else {
      toast.success("Marca cadastrada com sucesso");
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
        onSubmit={handleSubmit(insertBrand)}
        title="Cadastrar marca"
        titlePostion="center"
        titleSize="xl"
        weight="w-96"
      >
        <FormFieldTextBox
          name="mar_nome"
          register={register}
          required={true}
          title="Nome da marca"
          placeholder="Digite o nome da marca"
          size="w-full"
        />
        <Button text="Cadastrar" />
      </FormRegister>
    </>
  );
}
