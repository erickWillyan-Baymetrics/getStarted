// routes/AppRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut } from "@nhost/react";
import Signup from "../pages/Signup";
import PrivateRoute from "./private-routes";
import SigninMagic from "../pages/signPages/SigninMagic";
import Signin from "../pages/signPages/Signin";
import RegisterMachine from "../pages/machine/RegisterMachine";
import ManagerMachine from "../pages/machine";
import InformationMachine from "../pages/machine/informationMachine";
import RegisterBrand from "../pages/brand/register-brand";
import RegisterModel from "../pages/model/register-model";
import RegisterOperatingSystem from "../pages/operatingSystem/register-operating-system";
import NotFoundPage from "../pages/notFound";
import EditMachine from "../pages/machine/edit-machine";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/editMachine/:id"
        element={
          <PrivateRoute>
            <EditMachine />
          </PrivateRoute>
        }
      />
      <Route
        path="/registerOperatingSystem"
        element={
          <PrivateRoute>
            <RegisterOperatingSystem />
          </PrivateRoute>
        }
      />

      <Route
        path="/registerBrand"
        element={
          <PrivateRoute>
            <RegisterBrand />
          </PrivateRoute>
        }
      />

      <Route
        path="/registerModel"
        element={
          <PrivateRoute>
            <RegisterModel />
          </PrivateRoute>
        }
      />

      <Route
        path="/managerMachine"
        element={
          <PrivateRoute>
            <ManagerMachine />
          </PrivateRoute>
        }
      />

      <Route
        path="/informationMachine/:id"
        element={
          <PrivateRoute>
            <InformationMachine />
          </PrivateRoute>
        }
      />

      <Route
        path="/registerMachine"
        element={
          <PrivateRoute>
            <RegisterMachine />
          </PrivateRoute>
        }
      />

      <Route path="/signup" element={<Signup />} />
      <Route path="/magicLink" element={<SigninMagic />} />

      <Route
        path="/"
        element={
          <>
            <SignedIn>
              <Navigate to="/managerMachine" replace />
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
          <>
            <SignedOut>
              <NotFoundPage path="notFound" />
            </SignedOut>
            <SignedIn>
              <Navigate to="/managerMachine" replace />
            </SignedIn>
          </>
        }
      />
    </Routes>
  );
}
