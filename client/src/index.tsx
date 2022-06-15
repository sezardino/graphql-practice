import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql",
});

const authLink = setContext((_, ctx) => {
  // get the authentication token from local storage if it exists
  const tokens = JSON.parse(localStorage.getItem("userRefresh") || "{}");
  // return the headers to the context so httpLink can read them

  const headers = { ...ctx.headers };

  if (tokens.refresh) {
    headers.authorization = `Bearer ${tokens.refresh}`;
  }

  return {
    // headers,
  };
});

console.log(authLink.concat(httpLink));

const client = new ApolloClient({
  cache: new InMemoryCache(),
  // uri: "http://localhost:5000/graphql",
  link: authLink.concat(httpLink),
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  </React.StrictMode>
);
