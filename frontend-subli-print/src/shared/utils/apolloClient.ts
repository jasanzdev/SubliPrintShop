import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_GQL,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
