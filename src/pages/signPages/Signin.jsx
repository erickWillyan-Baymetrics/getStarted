import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "../../components/button-register";
import { useSignInEmailPassword } from "@nhost/react";
import toast, { Toaster } from "react-hot-toast";
import FormRegister from "../../components/form-register";
import FormFieldTextBox from "../../components/form-field-text-box";

export default function Signin() {
  const { register, handleSubmit, reset } = useForm();

  const { signInEmailPassword } = useSignInEmailPassword();

  const handleSign = async (data) => {
    const email = data.email;
    const password = data.password;
    const response = await signInEmailPassword(email, password);

    if (response.error) {
      toast.error("Não possível realizar seu login");
    }

    if (response.isSuccess == true) {
      <Navigate to="managerMachine" replace />;
    }
    reset();
  };
  return (
    <>
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      <FormRegister
        onSubmit={handleSubmit(handleSign)}
        title="Login"
        titlePostion="center"
        weight="w-96"
        titleSize="xl"
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
          type="password"
          placeholder="Digite sua senha"
          size="w-full"
          title="Senha"
        />
        <Button text="Entrar" />
        <div className="flex w-full justify-center px-4 mt-2">
          <Link
            to="/signup"
            className="text-blue-500 font-bold hover:text-blue-700 delay-200 duration-200 "
          >
            Criar uma conta
          </Link>
        </div>
      </FormRegister>
    </>
  );
}
