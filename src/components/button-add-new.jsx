import { MdAddCircleOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function ButtonAddNew({ pageAdd }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(pageAdd)}
      className="flex items-center px-2 py-1 bg-green-400 rounded-sm text-white font-bold cursor-pointer hover:bg-green-600 delay-300 duration-300"
    >
      <p>Adicionar</p> <MdAddCircleOutline className="ml-2" size={20} />
    </button>
  );
}
