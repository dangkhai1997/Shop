import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux";
import { Button, Form,Image } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
export const UserLogin = (props) => {
  const authUser = useSelector((state) => state.authUser);

  const [state, setState] = useState({
    name: "",
    phoneNumber: "",
    url: "/images/default.png",
    image: null,
    fileName: '',
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
          actions.userSignup(
            state.name,
            state.phoneNumber,
            state.image,
            state.fileName
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

  const onFileChange = (event) => {
    const fileName = event.target.files[0].name;
    const value = event.target.files[0];
    const url = URL.createObjectURL(value);
    const { name } = event.target;
    setState({
      ...state,
      [name]: value,
      url: url,
      fileName: fileName,
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
{!state.isLoginPage && (
          <>
            <Image src={state.url} size="small" style={{ margin: "0 auto" }} />
            <div style={{ maxWidth: "250px", margin: "0 auto" }}>
              <input
                type="file"
                id="myFile"
                onChange={onFileChange}
                name="image"
              />
            </div>
          </>
        )}
        <div>
          <Button type="submit">{!state.isLoginPage ? "Save" : "Login"}</Button>
        </div>
      </Form>
    </div>
  );
};
