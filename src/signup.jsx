import LabelForm from "./components/LabelForm";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import TextBox from "./components/TextBox";
import Button from "./components/Button";
import { nhost } from "./lib/nhost";
import toast, { Toaster } from "react-hot-toast";
export default function signup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleCreateUser = async (data) => {
    const response = await nhost.auth.signUp({
      email: data.email,
      password: data.senha,
    });
    if (response.error) {
      toast.error("Não foi possível realizar seu cadastro");
    }
    reset();
  };
  return (
    <>
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      <form
        onSubmit={handleSubmit(handleCreateUser)}
        className="flex flex-col m-auto  w-96 items-center gap-4 shadow-xl/20 px-5 pb-8 rounded-lg"
      >
        <div className="flex flex-col w-full items-center gap-2">
          <h1 className="text-blue-500 font-bold text-2xl mt-4 mb-4 select-none">
            Sign Up
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
            name="senha"
          />
        </div>
        <Button type="submit" texto="Cadastrar" />
        <Link
          to="/magicLink"
          className="text-blue-500 font-bold hover:text-blue-600 delay-200 duration-200"
        >
          Login sem senha
        </Link>
      </form>
    </>
  );
}
