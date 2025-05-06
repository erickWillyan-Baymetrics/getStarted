// routes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut } from "@nhost/react";
import Signup from "./pages/Signup";
import Todos from "./pages/Todos";
import SigninMagic from "./pages/SigninMagic";
import Signin from "./pages/Signin";
import RegisterMachine from "./pages/RegisterMachine";
import RegisterPart from "./pages/RegisterPart";
import ManagerMachine from "./pages/ManagerMachine";
import EditMachine from "./pages/EditMachine";

export default function AppRoutes({ session }) {
  console.log(!session);
  return (
    <Routes>
      <Route
        path="/menagerMachine"
        element={
          <SignedIn>
            <ManagerMachine />
          </SignedIn>
        }
      />
      <Route
        path="/editMachine/:id"
        element={
          <SignedIn>
            <EditMachine />
          </SignedIn>
        }
      />
      <Route
        path="/registerPart"
        element={
          <SignedIn>
            <RegisterPart />
          </SignedIn>
        }
      />
      <Route
        path="/registerMachine"
        element={
          <SignedIn>
            <RegisterMachine />
          </SignedIn>
        }
      />
      <Route path="/signup" element={<Signup />} />
      <Route path="/magicLink" element={<SigninMagic />} />
      <Route
        path="/"
        element={
          <>
            <SignedIn>
              <Navigate to="registerMachine" replace />
            </SignedIn>
            <SignedOut>
              <Signin />
            </SignedOut>
          </>
        }
      />
      <Route
        path="*"
        element={
          <SignedOut>
            <Navigate to="/" replace />
          </SignedOut>
        }
      />
    </Routes>
  );
}
