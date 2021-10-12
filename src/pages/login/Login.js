import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import * as actions from "../../redux";
import { Button, Form } from "semantic-ui-react";
export const Login = (props) => {
  const [state, setState] = useState({
    name: "",
    phoneNumber: "",
  });
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(actions.login(state.name, state.phoneNumber));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  return (
    <div>
      {auth?.loading ? ' loading ..................................................' : null}
      <Form onSubmit={submitHandler}>
        <Form.Field>
          <label>Shop Name</label>

          <input placeholder="Shop Name" onChange={handleChange} name="name" />
        </Form.Field>
        <Form.Field>
          <label>Phone Number</label>
          <input placeholder="Phone Number" onChange={handleChange} name="phoneNumber" />
        </Form.Field>

        <Button type="submit">Save</Button>
      </Form>
    </div>
  );
};
