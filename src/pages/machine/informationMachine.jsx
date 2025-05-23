import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import InformationLabelMachine from "../../components/information-label-machine";
import FormRegister from "../../components/form-register";
import BackButton from "../../components/back-button";
import ButtonEdit from "../../components/button-edit";
import { useQuery } from "@apollo/client";
import { GET_MACHINE_BY_ID } from "../../graphql/queries/machine/get-machine-by-id";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../../components/loadingComponent";

export default function InformationMachine() {
  const [machine, setMachine] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, error, loading } = useQuery(GET_MACHINE_BY_ID, {
    fetchPolicy: "network-only",
    variables: {
      maq_id: id,
    },
  });

  useEffect(() => {
    if (data && data.maquina[0]) {
      setMachine(data.maquina[0]);
    }
  }, [data]);

  if (loading) return <LoadingPage />;

  return (
    <>
      <div className="mt-4 ml-4">
        <BackButton to="/" />
      </div>
      <FormRegister
        title="Máquina"
        titlePostion="center"
        titleSize="xl"
        weight={"w-96"}
      >
        <InformationLabelMachine
          title="Nome da máquina"
          information={machine.maq_nome}
        />
        <InformationLabelMachine
          title="Número Serial"
          information={machine.maq_serial}
        />
        <InformationLabelMachine
          title="Patrimônio"
          information={machine.maq_patrimonio}
        />
        <InformationLabelMachine
          title="Número Serial"
          information={machine.maq_serial}
        />
        <InformationLabelMachine
          title="Status"
          information={machine.maq_status}
        />
        <InformationLabelMachine
          title="Modelo"
          information={machine.modelo?.mod_nome}
        />
        <InformationLabelMachine
          title="Sistema Operacional"
          information={machine.sistema_operacional?.sto_nome}
        />
        <InformationLabelMachine
          title="Usuário"
          information={machine.users?.email}
        />
        <div className="flex flex-col">
          <label className="text-blue-500  font-bold">Observações</label>
          <textarea
            className="p-2 bg-gray-200 min-h-20"
            value={machine.maq_observacoes}
          />
        </div>
        <div className="flex justify-end mt-2 w-full ">
          <ButtonEdit onClick={() => navigate(`/editMachine/${id}`)} />
        </div>
      </FormRegister>
    </>
  );
}
