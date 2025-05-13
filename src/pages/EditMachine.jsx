import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/header";
import { useNhostClient } from "@nhost/react";
import LabelForm from "../components/LabelForm";
import TextBox from "../components/TextBox";
import { useForm } from "react-hook-form";

const getMachine = `
query($id: Int!) {
    maquina(where: { maq_id: { _eq: $id } }) {
      maq_id
      maq_nome
      maq_serial
      maq_marca
      maq_modelo
      maq_patrimonio
      maq_sistema_operacional
      fk_user_id
    }
  }
`;

export default function EditMachine() {
  const [machine, setMachine] = useState({});
  const { id } = useParams();
  const nhostClient = useNhostClient();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      maq_sistema_operacional: machine.maq_sistema_operacional,
      maq_patrimonio: machine.maq_patrimonio,
    },
  });

  useEffect(() => {
    const getDataUser = async (id) => {
      const { data, error } = await nhostClient.graphql.request(getMachine, {
        id,
      });

      if (error) {
        console.log("Erro: ", error);
        return;
      }

      console.log(data.maquina[0]);
      setMachine(data.maquina[0]);

      reset({
        maq_patrimonio: data.maquina[0].maq_patrimonio,
        maq_sistema_operacional: data.maquina[0].maq_sistema_operacional,
      });
    };

    getDataUser(id);
  }, [id, useForm()]);

  const saveMachine = async (values) => {
    console.log(id);
  };
  return (
    <>
      <Header />
      <form
        className=" flex flex-col m-auto mt-6 bg-white w-2/3 items-center gap-4  px-5 pb-8 rounded-lg"
        onSubmit={handleSubmit(saveMachine)}
      >
        <h1 className="text-blue-500 font-bold text-2xl mt-4 mb-4 select-none">
          Editar máquina
        </h1>
        <div className="flex flex-col items-center">
          <div className="flex w-11/12">
            <div className="w-44">
              <LabelForm title="Máquina" />
              <TextBox
                register={register}
                value={machine.maq_nome}
                name="maq_nome"
                readOnly={true}
              />
            </div>
            <div className="w-44">
              <LabelForm title="Serial" />
              <TextBox
                register={register}
                value={machine.maq_serial}
                name="maq_serial"
                readOnly={true}
              />
            </div>
            <div className="w-44">
              <LabelForm title="Patrimônio" />
              <TextBox
                register={register}
                // value={machine.maq_patrimonio}
                name="maq_patrimonio"
              />
            </div>
          </div>

          <div className="flex w-11/12">
            <div className="w-44">
              <LabelForm title="Marca" />
              <TextBox
                register={register}
                value={machine.maq_marca}
                name="maq_marca"
                readOnly={true}
              />
            </div>
            <div className="w-44">
              <LabelForm title="Modelo" />
              <TextBox
                register={register}
                value={machine.maq_modelo}
                name="maq_modelo"
                readOnly={true}
              />
            </div>
            <div className="w-44">
              <LabelForm title="Sistema operacional" />
              <TextBox
                register={register}
                // value={machine.maq_sistema_operacional}
                name="maq_sistema_operacional"
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
