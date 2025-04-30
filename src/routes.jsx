// routes.jsx
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Todos from "./pages/Todos";
import SigninMagic from "./pages/SigninMagic";
import Signin from "./pages/Signin";
import RegisterMachine from "./pages/RegisterMachine";
import RegisterPart from "./pages/RegisterPart";
import ManagerMachine from "./pages/ManagerMachine";
import EditMachine from "./pages/EditMachine";

export default function AppRoutes({ session }) {
  return (
    <Routes>
      <Route path="/menagerMachine" element={<ManagerMachine />} />
      <Route path="/magicLink" element={<SigninMagic />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/editMachine/:id" element={<EditMachine />} />
      {/* <Route path="/registerMachine" element={<RegisterMachine />} /> */}
      <Route path="/registerPart" element={<RegisterPart />} />
      {session ? (
        <Route path="/" element={<RegisterMachine session={session} />} />
      ) : (
        <Route path="/" element={<Signin />} />
      )}
      {/* {session ? (
        <Route path="/" element={<Todos session={session} />} />
      ) : (
        <Route path="/" element={<Signin />} />
      )} */}
    </Routes>
  );
}
