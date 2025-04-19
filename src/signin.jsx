import { useState } from "react";
import { useSignInEmailPasswordless } from "@nhost/react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signInEmailPasswordless, error } = useSignInEmailPasswordless();

  const onSubmit = async (data) => {
    const promise = signInEmailPasswordless(data.email);

    toast.loading("Enviando...");

    try {
      const result = await promise;

      if (result.error) {
        throw new Error(result.error.message);
      }

      toast.dismiss();
      toast.success("Email enviado com sucesso!");
    } catch (err) {
      toast.dismiss();
      toast.error(err.message || "Erro ao enviar o email");
    }
  };

  return (
    <>
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col m-auto  w-96 items-center gap-4 shadow-xl/20 px-5 pb-8 rounded-lg"
      >
        <div className="flex flex-col w-full items-center gap-2">
          <h1 className="text-blue-500 font-bold text-2xl mt-4 mb-4 select-none">
            Sign
          </h1>
          <label className="text-blue-500 font-extrabold text-base w-full ml-8 select-none">
            Email
          </label>
          <input
            placeholder="Insira seu email"
            {...register("email", { required: true })}
            className="py-2 rounded-sm  w-11/12 px-3 font-bold text-sm bg-stone-200 select-none"
          />
          {errors.email && (
            <span className="text-red-800  text sm w-full ml-8 select-none">
              Este campo é obrigatório
            </span>
          )}
        </div>

        <button
          className="py-2 bg-blue-500 rounded-sm w-11/12 cursor-pointer hover:scale-101 duration-500 delay-400"
          type="submit"
        >
          <p className="text-white font-bold tracking-wide text-base select-none">
            Cadastrar
          </p>
        </button>
      </form>
    </>
  );
}
