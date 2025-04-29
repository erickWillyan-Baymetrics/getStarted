// routes.jsx
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Todos from "./pages/Todos";
import SigninMagic from "./pages/SigninMagic";
import Signin from "./pages/Signin";
import RegisterMachine from "./pages/RegisterMachine";
import RegisterPart from "./pages/RegisterPart";

export default function AppRoutes({ session }) {
  return (
    <Routes>
      <Route path="/magicLink" element={<SigninMagic />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/registerMachine" element={<RegisterMachine />} />
      <Route path="/registerPart" element={<RegisterPart />} />
      {session ? (
        <Route path="/" element={<Todos session={session} />} />
      ) : (
        <Route path="/" element={<Signin />} />
      )}
    </Routes>
  );
}
