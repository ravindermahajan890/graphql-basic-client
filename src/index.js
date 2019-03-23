import React from "react";
import ReactDOM from "react-dom";
import ListPage from "./ListPage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://api.ravindermahajan.co.in/graphql"
  }),
  cache: new InMemoryCache()
});
ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <div>
        <Route exact path="/" component={ListPage} />
      </div>
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);
