import { FaEdit } from "react-icons/fa";
export default function ButtonEdit({ onClick }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="flex text-white font-bold items-center cursor-grabbing bg-blue-500 py-1 px-3 rounded-sm"
    >
      Editar <FaEdit className="ml-2" size={16} />
    </button>
  );
}
