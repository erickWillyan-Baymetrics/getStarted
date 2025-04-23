// routes.jsx
import { Routes, Route } from "react-router-dom";
import Signup from "./signup";
import Todos from "./todos";
import SigninMagic from "./signinMagic";

export default function AppRoutes({ session }) {
  return (
    <Routes>
      <Route path="/magicLink" element={<SigninMagic />} />
      {session ? (
        <Route path="/" element={<Todos session={session} />} />
      ) : (
        <Route path="/" element={<Signup />} />
      )}
    </Routes>
  );
}
