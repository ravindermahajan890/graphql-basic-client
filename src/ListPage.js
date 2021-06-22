import React from "react";
import { gql, useQuery, useMutation } from "@apollo/client";

const GET_DATA = gql`
  query fetch {
    fetch {
      task
      detail
      taskId
      pending
    }
  }
`;

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

const UNDO_TASK_QUERY = gql`
  mutation undo($taskId: String!) {
    undo(taskId: $taskId) {
      task
      detail
      taskId
      pending
    }
  }
`;

const ExchangeRates = () => {
  const { loading, error, data } = useQuery(GET_DATA);
  const [deleteTask] = useMutation(DELETE_TASK_QUERY, {
    refetchQueries: [{ query: GET_DATA }],
  });
  const [undoTask] = useMutation(UNDO_TASK_QUERY, {
    refetchQueries: [{ query: GET_DATA }],
  });
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
  return (
    <div className="list-group">
      {data.fetch.map(
        ({ task, detail, taskId, pending: taskPending }, index) => {
          return (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a
              href="#"
              className={`list-group-item list-group-item-action ${
                !taskPending ? "opaque" : ""
              }`}
              key={index}
            >
              <div className={`d-flex w-100 justify-content-between`}>
                {<h5 className="col-sm-8">{task}</h5>}
                {taskPending && (
                  <button
                    className="btn btn-success col-sm-offset-2
                      col-sm-2"
                    onClick={async () => {
                      await deleteTask({ variables: { taskId } });
                    }}
                  >
                    done
                  </button>
                )}
                {!taskPending && (
                  <button
                    className="btn btn-success col-sm-offset-2
                      col-sm-2"
                    onClick={async () => {
                      await undoTask({ variables: { taskId } });
                    }}
                  >
                    Undo
                  </button>
                )}
                <small />
              </div>
              <p className="mb-1 col-sm-12">{detail}</p>
            </a>
          );
        }
      )}
    </div>
  );
};
export default ExchangeRates;
