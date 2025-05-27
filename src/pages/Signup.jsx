import { useForm } from "react-hook-form";
import Button from "../components/button-register";
import { useSignUpEmailPassword } from "@nhost/react";
import toast, { Toaster } from "react-hot-toast";
import FormRegister from "../components/form-register";
import FormFieldTextBox from "../components/form-field-text-box";
export default function signup() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { signUpEmailPassword } = useSignUpEmailPassword();

  const handleCreateUser = async (data) => {
    const email = data.email;
    const password = data.password;
    const response = await signUpEmailPassword(email, password);
    if (response.error) {
      toast.error("Não possível realizar seu cadastro");
    }
    reset();
  };
  return (
    <>
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      <FormRegister
        onSubmit={handleSubmit(handleCreateUser)}
        title="Criar conta"
        titlePostion="center"
        weight="w-96"
        titleSize="xl"
        backRoute="/"
      >
        <FormFieldTextBox
          name="email"
          register={register}
          required={true}
          placeholder="Digite o seu email"
          size="w-full"
          title="Email"
        />
        <FormFieldTextBox
          name="password"
          register={register}
          required={true}
          placeholder="Digite sua senha"
          size="w-full"
          title="Senha"
          type="password"
        />
        <Button text="Criar conta" />
      </FormRegister>
    </>
  );
}
