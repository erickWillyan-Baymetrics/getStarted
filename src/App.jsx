import { NhostProvider } from "@nhost/react";
import { nhost } from "./lib/nhost.js";
import SignIn from "./signin.jsx";
import Todos from "./todos.jsx";
import { useEffect, useState } from "react";

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
      {session ? <Todos session={session} /> : <SignIn />}
    </NhostProvider>
  );
}

export default App;
