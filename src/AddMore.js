import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { gql, useQuery, useMutation } from "@apollo/client";
import "react-datepicker/dist/react-datepicker.css";
const ADD_TODO = gql`
  mutation post($task: String!, $detail: String!) {
    post(task: $task, detail: $detail) {
      task
      detail
      pending
    }
  }
`;
const AddMore = () => {
  const [task, setTask] = useState("");
  const [detail, setDetail] = useState(new Date());
  const [addTodo] = useMutation(ADD_TODO);

  return (
    <div>
      <div className="jumbotron">
        <h1 className="display-4">Please add your Tasks</h1>
        <form>
          <div className="form-group">
            <label for="formGroupExampleInput">Task</label>

            <input
              className="form-control form-control-lg"
              type="text"
              placeholder="Enter Task"
              onChange={(e) => {
                setTask(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label for="formGroupExampleInput2">Date</label>
            <DatePicker
              className="form-control form-control-lg"
              selected={new Date(detail)}
              onChange={(value) => {
                setDetail(new Date(value).toDateString());
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
    </div>
  );
};
export default AddMore;
