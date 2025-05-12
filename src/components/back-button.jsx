import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

export default function BackButton(props) {
  const navigate = useNavigate();
  return (
    <button
      className="flex items-center font-bold text-blue-500 hover:text-blue-700 cursor-pointer delay-200 duration-200"
      onClick={navigate(props.to)}
    >
      <IoIosArrowBack size={20} /> Voltar
    </button>
  );
}
