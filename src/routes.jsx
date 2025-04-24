// routes.jsx
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Todos from "./pages/Todos";
import SigninMagic from "./pages/SigninMagic";
import Signin from "./pages/Signin";

export default function AppRoutes({ session }) {
  return (
    <Routes>
      <Route path="/magicLink" element={<SigninMagic />} />
      <Route path="/signup" element={<Signup />} />
      {session ? (
        <Route path="/" element={<Todos session={session} />} />
      ) : (
        <Route path="/" element={<Signin />} />
      )}
    </Routes>
  );
}
