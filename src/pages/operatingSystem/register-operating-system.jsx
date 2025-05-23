import Header from "../../components/header";
import FormRegister from "../../components/form-register";
import { useForm } from "react-hook-form";
import Button from "../../components/button-register";
import FormFieldTextBox from "../../components/form-field-text-box";
import toast, { Toaster } from "react-hot-toast";
import { CREATE_OPERATING_SYSTEM } from "../../graphql/mutations/operatingSystem/create-operating-system";
import { useMutation } from "@apollo/client";

export default function RegisterOperatingSystem() {
  const { register, reset, handleSubmit } = useForm();
  const [CreateOperatingSystem] = useMutation(CREATE_OPERATING_SYSTEM);

  const insertOperatingSystem = async (values) => {
    try {
      await CreateOperatingSystem({ variables: values });
      toast.success("Sistema operacional cadastrado");
      reset();
    } catch (error) {
      console.log(error);
      toast.error("Sitema operacional não cadastrado");
    }
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
