import { useEffect, useState } from "react";
import ButtonAddNew from "../../components/button-add-new.jsx";
import Header from "../../components/header.jsx";
import CardMachine from "../../components/CardMachine.jsx";
import { LIST_MACHINE } from "../../graphql/queries/machine/list-machine.js";
import { useQuery } from "@apollo/client";
import LoadingPage from "../../components/loadingComponent.jsx";

export default function ManagerMachine() {
  const [machines, setMachines] = useState([]);
  const { data, loading, error } = useQuery(LIST_MACHINE, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data && data.maquina) {
      setMachines(data.maquina);
    }
  }, [data]);

  if (loading) {
    return <LoadingPage />;
  }
  return (
    <>
      <Header />
      <div className="flex w-10/12 m-auto mb-8">
        <h4 className="w-11/12  text-blue-500 font-bold text-xl">Máquinas</h4>
        <ButtonAddNew pageAdd="/registerMachine" />
      </div>
      <div className="grid justify-items-center grid-cols-4 gap-4 w-10/12 m-auto">
        {machines.map((data) => {
          return (
            <CardMachine
              maq_id={data.maq_id}
              maq_nome={data.maq_nome}
              maq_serial={data.maq_serial}
              key={data.maq_id}
            />
          );
        })}
      </div>
    </>
  );
}
