import React, { useState } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
const ADD_TODO = gql`
  mutation post($name: String!, $age: Int!) {
    post(name: $name, age: $age) {
      name
      age
    }
  }
`;
const AddMore = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  return (
    <Mutation mutation={ADD_TODO}>
      {(addTodo, { data }) => (
        <div>
          <label>Name</label>
          <input
            onChange={e => {
              setName(e.target.value);
            }}
          />
          <label>Age</label>
          <input
            onChange={e => {
              setAge(parseInt(e.target.value));
            }}
          />
          <button
            onClick={async () => {
              addTodo({ variables: { name, age } });
            }}
          >
            Click to seee magic
          </button>
          {data &&
            data.post.map(item => (
              <div>
                <span>{item.name}</span>
                <span>{item.age}</span>
              </div>
            ))}
        </div>
      )}
    </Mutation>
  );
};
export default AddMore;
