import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { nhost } from "./nhost";

const httpLink = new HttpLink({
  uri: nhost.graphql.httpUrl,
});

const authLink = setContext(async (_, { headers }) => {
  const accessToken = await nhost.auth.getAccessToken();

  return {
    headers: {
      ...headers,
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  };
});

export const apolloClient = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
});
