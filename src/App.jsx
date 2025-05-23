import { NhostProvider } from "@nhost/react";
import { nhost } from "./lib/nhost.js";
import { BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import AppRoutes from "../src/routes/routes.jsx";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./lib/apollo.js";

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
      <ApolloProvider client={apolloClient}>
        <BrowserRouter>
          <AppRoutes session={session} />
        </BrowserRouter>
      </ApolloProvider>
    </NhostProvider>
  );
}

export default App;
