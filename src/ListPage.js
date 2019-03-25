import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const ExchangeRates = () => (
  <div>
    <Query
      query={gql`
        query fetch {
          fetch {
            task
            detail
          }
        }
      `}
    >
      {({ loading, error, data }) => {
        if (loading)
          return (
            <div className="jumbotron jumbotron-fluid">
              <div className="d-flex justify-content-center">
                <div
                  className="spinner-border"
                  style={{ width: "10rem", height: "10rem" }}
                  role="status"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            </div>
          );
        if (error) return <p>Error :(</p>;

        return (
          <div className="list-group">
            {data.fetch.map(({ task, detail }, index) => {
              return (
                <a
                  href="#"
                  className="list-group-item list-group-item-action"
                  key={index}
                >
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{task}</h5>
                    <small />
                  </div>
                  <p className="mb-1">{detail}</p>
                </a>
              );
            })}
          </div>
        );
      }}
    </Query>
  </div>
);
export default ExchangeRates;
