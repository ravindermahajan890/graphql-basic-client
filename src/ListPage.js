import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const ExchangeRates = () => (
  <Query
    query={gql`
      {
        fetch {
          name
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return data.fetch.map(({ name, age }) => (
        <div key={name}>
          <p>
            {name}: {age}
          </p>
        </div>
      ));
    }}
  </Query>
);
export default ExchangeRates;
