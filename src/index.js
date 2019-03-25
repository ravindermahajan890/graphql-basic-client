import React from "react";
import ReactDOM from "react-dom";
import ListPage from "./ListPage";
import AddPage from "./AddMore";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { Link } from "react-router-dom";

const defaultOptions = {
  watchQuery: {
    fetchPolicy: "network-only",
    errorPolicy: "ignore"
  },
  query: {
    fetchPolicy: "network-only",
    errorPolicy: "all"
  }
};
const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://api.ravindermahajan.co.in/graphql"
  }),
  cache: new InMemoryCache(),
  defaultOptions
});
ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <div>
        <button>
          <Link to="/">List</Link>
        </button>
        <button>
          <Link to="/add">Add item</Link>
        </button>
        <Route exact path="/" component={ListPage} />
        <Route exact path="/add" component={AddPage} />
      </div>
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);
