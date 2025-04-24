import { NhostProvider } from "@nhost/react";
import { nhost } from "./lib/nhost.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Todos from "./pages/Todos.jsx";
import { useEffect, useState } from "react";
import AppRoutes from "./routes.jsx";

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(nhost.auth.getSession());

    nhost.auth.onAuthStateChanged((_, session) => {
      setSession(session);
    });
  }, []);

  return (
    <NhostProvider nhost={nhost}>
      <BrowserRouter>
        <AppRoutes session={session} />
        {/* {session ? <Todos session={session} /> : <Signup />} */}
      </BrowserRouter>
    </NhostProvider>
  );
}

export default App;
