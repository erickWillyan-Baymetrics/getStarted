//Erick Willyan dos Santos Cruz 08/05/2025
//Função: Página com o objetivo de realizar o cadastro de uma marca.
import FormRegister from "../../components/form-register";
import Header from "../../components/header";
import FormFieldTextBox from "../../components/form-field-text-box";
import Button from "../../components/button-register";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { CREATE_BRAND } from "../../graphql/mutations/brand/create-brand";

export default function RegisterBrand() {
  const { register, reset, handleSubmit } = useForm();
  const [CreateBrand] = useMutation(CREATE_BRAND);

  const insertBrand = async (values) => {
    try {
      await CreateBrand({
        variables: values,
      });

      toast.success("Marca cadastrada com sucesso");
      reset();
    } catch (err) {
      console.error(err);
      toast.error("Erro ao cadastrar marca");
    }
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
