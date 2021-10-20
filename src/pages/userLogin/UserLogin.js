import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux";
import { Button, Form } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
export const UserLogin = (props) => {
  const authUser = useSelector((state) => state.authUser);

  const [state, setState] = useState({
    name: "",
    phoneNumber: "",
  });

  const history = useHistory();

  const dispatch = useDispatch();
  const submitHandler = (event) => {
    event.preventDefault();
    setState({
      ...state,
      isSubmit: true,
    });
      
    state.isLoginPage
      ? dispatch(actions.userLogin(state.phoneNumber))
      : dispatch(
          actions.signup(
            state.name,
            state.phoneNumber
          )
        );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
    };
    
    useEffect(() => {
    if (authUser.user.customerId) {
      return;
    }

  }, [authUser]);

  const changePage = (e) => {
    e.preventDefault();
    setState({
      ...state,
      isLoginPage: !state.isLoginPage,
    });
  };
 

  return (
    <div>
      <a href="javascript.void(0)" onClick={changePage}>
        {state.isLoginPage ? "Register" : "Login"}
      </a>
      <Form onSubmit={submitHandler}>
        {!state.isLoginPage && (
          <Form.Field>
            <label>Customer Name</label>

            <input
              placeholder="Customer Name"
              onChange={handleChange}
              name="name"
            />
          </Form.Field>
        )}
        <Form.Field>
          <label>Phone Number</label>
          <input
            placeholder="Phone Number"
            onChange={handleChange}
            name="phoneNumber"
          />
        </Form.Field>

        <div>
          <Button type="submit">{!state.isLoginPage ? "Save" : "Login"}</Button>
        </div>
      </Form>
    </div>
  );
};
