import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
const DELETE_TASK_QUERY = gql`
  mutation delete($taskId: String!) {
    delete(taskId: $taskId) {
      task
      detail
      taskId
      pending
    }
  }
`;

const deleteTask = async (taskId, deleteTaskQuery) => {
  deleteTaskQuery({ variables: { taskId } });
};
const ExchangeRates = () => (
  <div>
    <Query
      query={gql`
        query fetch {
          fetch {
            task
            detail
            taskId
            pending
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
            {data.fetch.map(
              ({ task, detail, taskId, pending: taskPending }, index) => {
                return (
                  <Mutation mutation={DELETE_TASK_QUERY}>
                    {(
                      deleteTaskQuery,
                      { data: { delete: { pending = true } = {} } = {} }
                    ) => (
                      <a
                        href="#"
                        className={`list-group-item list-group-item-action ${
                          !taskPending || !pending ? "opaque" : ""
                        }`}
                        key={index}
                      >
                        <div className={`d-flex w-100 justify-content-between`}>
                          {<h5 className="col-sm-8">{task}</h5>}
                          <button
                            className="btn btn-success col-sm-offset-2
                      col-sm-2"
                            onClick={async () => {
                              await deleteTask(taskId, deleteTaskQuery);
                            }}
                          >
                            done
                          </button>
                          <button
                            className="btn btn-warning col-sm-offset-2
                      col-sm-2"
                            onClick={async () => {
                              await deleteTask(taskId, deleteTaskQuery);
                            }}
                          >
                            Clear
                          </button>
                          <small />
                        </div>
                        <p className="mb-1 col-sm-12">{detail}</p>
                      </a>
                    )}
                  </Mutation>
                );
              }
            )}
          </div>
        );
      }}
    </Query>
  </div>
);
export default ExchangeRates;
