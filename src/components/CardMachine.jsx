import { Link } from "react-router-dom";
export default function CardMachine({ maq_id, maq_nome, maq_serial }) {
  return (
    <div className="flex flex-col justify-between w-64 py-2 px-2  bg-white rounded-sm">
      <div className="">
        <p className=" text-blue-500 font-bold">{maq_nome}</p>
        <div className="flex gap-x-2 mt-2">
          <p className="text-blue-500 font-bold">Serial</p>
          <p className="font-semibold">{maq_serial}</p>
        </div>
      </div>
      <div className="flex justify-end">
        <Link
          to={`/editMachine/${maq_id}`}
          className=" py-1 px-3 bg-blue-500 rounded-sm text-white font-bold"
        >
          Editar
        </Link>
      </div>
    </div>
  );
}
