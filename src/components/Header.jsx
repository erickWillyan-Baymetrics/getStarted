import { Link } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { useNhostClient } from "@nhost/react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const nhostClient = useNhostClient();
  const navigate = useNavigate();
  return (
    <nav className="flex h-12 justify-around mb-7 items-center">
      <ul className="flex gap-8">
        <li className="hover:border-b-2 hover:border-b-blue-700 delay-200 duration-200">
          <Link
            className="text-blue-500 font-bold  hover:text-blue-700 delay-100 duration-100"
            to="/managerMachine"
          >
            Máquinas
          </Link>
        </li>
        <li className="hover:border-b-2 hover:border-b-blue-700 delay-200 duration-200">
          <Link
            className="text-blue-500 font-bold  hover:text-blue-700 delay-100 duration-100"
            to="/registerBrand"
          >
            Marca
          </Link>
        </li>
        <li className="hover:border-b-2 hover:border-b-blue-700 delay-200 duration-200">
          <Link
            className="text-blue-500 font-bold  hover:text-blue-700 delay-100 duration-100"
            to="/registerModel"
          >
            Modelo
          </Link>
        </li>

        <li className="hover:border-b-2 hover:border-b-blue-700 delay-200 duration-200">
          <Link
            className="text-blue-500 font-bold  hover:text-blue-700 delay-100 duration-100"
            to="/registerOperatingSystem"
          >
            Sistema Operacional
          </Link>
        </li>
      </ul>
      <div className=" w-10">
        <button
          type="button"
          className="flex justify-center py-2 bg-red-600 hover:bg-red-700 duration-200 delay-200 text-white font-bold w-full rounded-md cursor-pointer"
          onClick={() => {
            nhostClient.auth.signOut();
            navigate("/");
          }}
        >
          <MdLogout color="#fff" size={20} />
        </button>
      </div>
    </nav>
  );
}
