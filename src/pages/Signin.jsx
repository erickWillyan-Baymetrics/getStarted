import LabelForm from "../components/LabelForm";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import TextBox from "../components/TextBox";
import Button from "../components/Button";
import { useSignInEmailPassword } from "@nhost/react";
import toast, { Toaster } from "react-hot-toast";

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

    reset();
  };
  return (
    <>
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      <form
        onSubmit={handleSubmit(handleSign)}
        className="flex flex-col m-auto mt-6 bg-white w-96 items-center gap-4  px-5 pb-8 rounded-lg"
      >
        <div className="flex flex-col w-full items-center gap-2">
          <h1 className="text-blue-500 font-bold text-2xl mt-4 mb-4 select-none">
            Login
          </h1>
          <LabelForm title="Email" />
          <TextBox
            placeholder="Insira seu email"
            register={register}
            required={true}
            name="email"
          />
          <LabelForm title="Senha" />
          <TextBox
            placeholder="Insira sua senha"
            register={register}
            required={true}
            type="password"
            name="password"
          />
          <Button type="submit" texto="Entrar" />
        </div>
        <div>
          <Link
            to="/signup"
            className="text-blue-500 font-bold  hover:text-blue-700 delay-200 duration-200 m-1"
          >
            Criar uma conta
          </Link>
          <Link
            to="/magicLink"
            className="text-blue-500 font-bold  hover:text-blue-700 delay-200 duration-200"
          >
            | Login sem senha
          </Link>
        </div>
      </form>
    </>
  );
}
