import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  uri: "https://c2-p3.annisa-rachma.com",
  cache: new InMemoryCache(),
});

export default apolloClient