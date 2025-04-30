import { useEffect, useState } from "react";
import { useNhostClient } from "@nhost/react";
import Header from "../components/Header";
import CardMachine from "../components/CardMachine";

const getMachine = `
query{
  maquina {
    maq_id
    maq_nome
    maq_serial
  }
} 
`;

export default function ManagerMachine() {
  const [machines, setMachines] = useState([]);
  const cards = [
    { id: 1, title: "Cartão 1", description: "SN-2025-0001" },
    { id: 2, title: "Cartão 2", description: "SN-2025-0002" },
    { id: 3, title: "Cartão 3", description: "SN-2025-0003" },
    { id: 4, title: "Cartão 4", description: "SN-2025-0004" },
    { id: 5, title: "Cartão 5", description: "SN-2025-0005" },
    { id: 6, title: "Cartão 6", description: "SN-2025-0006" },
    { id: 7, title: "Cartão 7", description: "SN-2025-0007" },
    { id: 8, title: "Cartão 8", description: "SN-2025-0008" },
    { id: 9, title: "Cartão 9", description: "SN-2025-0009" },
    { id: 10, title: "Cartão 10", description: "SN-2025-0010" },
    { id: 11, title: "Cartão 11", description: "SN-2025-0011" },
    { id: 12, title: "Cartão 12", description: "SN-2025-0012" },
    { id: 13, title: "Cartão 13", description: "SN-2025-0013" },
    { id: 14, title: "Cartão 14", description: "SN-2025-0014" },
    { id: 15, title: "Cartão 15", description: "SN-2025-0015" },
    { id: 16, title: "Cartão 16", description: "SN-2025-0016" },
    { id: 17, title: "Cartão 17", description: "SN-2025-0017" },
    { id: 18, title: "Cartão 18", description: "SN-2025-0018" },
  ];

  const nhostClient = useNhostClient();
  useEffect(() => {
    const getMachinesFunction = async () => {
      const { data, error } = await nhostClient.graphql.request(getMachine);

      console.log("erro:", error);
      console.log(data.maquina);
      setMachines(data.maquina);
    };

    getMachinesFunction();
  }, []);
  return (
    <>
      <Header />
      <h4 className="w-11/12 m-auto mb-8 text-blue-500 font-bold text-xl">
        Máquinas
      </h4>
      <div className="grid justify-items-center grid-cols-4 gap-6 w-10/12 m-auto">
        {/* {cards.map((data) => {
          return (
            <CardMachine
              maq_id={data.id}
              maq_nome={data.title}
              maq_serial={data.description}
              key={data.id}
            />
          );
        })} */}
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
