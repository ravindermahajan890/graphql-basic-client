import React, { useState } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
const ADD_TODO = gql`
  mutation post($edetail: String!, $detail: Int!) {
    post(task: $task, detail: $detail) {
      task
      detail
    }
  }
`;
const AddMore = () => {
  const [task, setTask] = useState("");
  const [detail, setDetail] = useState(0);
  return (
    <Mutation mutation={ADD_TODO}>
      {(addTodo, { data }) => (
        <div>
          <div class="jumbotron">
            <h1 class="display-4">Please add your Tasks</h1>
            <form>
              <div className="form-group">
                <label for="formGroupExampleInput">Task</label>
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Enter Task"
                  onChange={e => {
                    setTask(e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label for="formGroupExampleInput2">Age</label>
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Enter Detail"
                  onChange={e => {
                    setDetail(parseInt(e.target.value));
                  }}
                />
              </div>
              <button
                type="button"
                className="btn btn-primary btn-block"
                onClick={async () => {
                  addTodo({ variables: { task, detail } });
                }}
              >
                Add
              </button>
            </form>
          </div>

          {data &&
            data.post.map(item => (
              <div>
                <span>{item.task}</span>
                <span>{item.deatil}</span>
              </div>
            ))}
        </div>
      )}
    </Mutation>
  );
};
export default AddMore;
