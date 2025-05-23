// components/PrivateRoute.jsx
import { SignedIn, SignedOut } from "@nhost/react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <Navigate to="/" replace />
      </SignedOut>
    </>
  );
}
