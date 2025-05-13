import Header from "../components/Header";
import { useForm } from "react-hook-form";
import { useNhostClient } from "@nhost/react";
import LabelForm from "../components/LabelForm";
import TextBox from "../components/TextBox";
import Button from "../components/Button";

const createPart = `
  mutation($pec_marca: String!, $pec_modelo: String!, $pec_nome: String!, $pec_tamanho: Float) {
    insert_pecas_one(object: {pec_marca: $pec_marca, pec_modelo: $pec_modelo, pec_nome: $pec_nome, pec_tamanho: $pec_tamanho}) {
      pec_id
    }
  }
`;

export default function RegisterPart() {
  const { register, handleSubmit, reset } = useForm();
  const nhostClient = useNhostClient();

  const addPart = async (data) => {
    const pec_marca = data.marca;
    const pec_modelo = data.modelo;
    const pec_nome = data.nome;
    const pec_tamanho = data.tamanho;

    let part = {
      pec_marca,
      pec_modelo,
      pec_nome,
      pec_tamanho,
    };

    console.log(part);
    const { error } = await nhostClient.graphql.request(createPart, part);

    console.log("resposta:", error);
    reset();
  };
  return (
    <>
      <Header />
      <form
        onSubmit={handleSubmit(addPart)}
        className="flex flex-col m-auto mt-6 bg-white w-96 items-center gap-4  px-5 pb-8 rounded-lg"
      >
        <div className="flex flex-col w-full items-center gap-2">
          <h6 className="text-blue-500 font-bold text-xl mt-4 mb-4 select-none">
            Cadastrar peças
          </h6>
          <LabelForm title="Nome da peça" />
          <TextBox
            placeholder="Insira o nome da peça"
            register={register}
            required={true}
            name="nome"
          />
          <LabelForm title="Marca" />
          <TextBox
            placeholder="Insira o marca da peça"
            register={register}
            required={true}
            name="marca"
          />
          <LabelForm title="Modelo" />
          <TextBox
            placeholder="Insira o modelo da peça"
            register={register}
            required={true}
            name="modelo"
          />
          <LabelForm title="Tamanho (Opcional)" />
          <TextBox
            placeholder="Insira o tamanho (GHz, GB, MHz, etc..)"
            register={register}
            required={false}
            name="tamanho"
          />
          <Button texto="Cadastrar" type="submit" />
        </div>
      </form>
    </>
  );
}
