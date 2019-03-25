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
        <nav className="navbar sticky-top  navbar-expand navbar-dark bg-dark">
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  List
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/add">
                  Add
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <Route exact path="/" component={ListPage} />
        <Route exact path="/add" component={AddPage} />
      </div>
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);
