import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux";
import { Button, Form, Image } from "semantic-ui-react";
export const Login = (props) => {
  const [state, setState] = useState({
    name: "",
    phoneNumber: "",
    image: null,
    url: "/images/default.png",
    isLoginPage: false
  });
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const submitHandler = (event) => {
    event.preventDefault();
    state.isLoginPage ? dispatch(actions.login(state.phoneNumber)) : dispatch(actions.signup(state.name, state.phoneNumber,state.image));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };
  
  const onFileChange = (event) => {
    const value = event.target.files[0];
    const url = URL.createObjectURL(value);
    const { name } = event.target;
    setState({
      ...state,
      [name]: value,
      url: url
    });
  };

  const changePage = (e) =>{
    e.preventDefault()
    setState({
      ...state,
     isLoginPage: !state.isLoginPage,
    });
  }

  return (
    <div>
      <a href="javascript.void(0)"
      onClick={changePage}>
        {state.isLoginPage ? 'Register':'Login' }
      </a>
      <Form onSubmit={submitHandler}>
        {/* {auth?.loading ? ' loading ..................................................' : null} */}
        {!state.isLoginPage &&
          <Form.Field>
            <label>Shop Name</label>

            <input placeholder="Shop Name" onChange={handleChange} name="name" />
          </Form.Field>}
        <Form.Field>
          <label>Phone Number</label>
          <input placeholder="Phone Number" onChange={handleChange} name="phoneNumber" />
        </Form.Field>
        {!state.isLoginPage &&
          
        <><Image src={state.url} size='small' style={{ margin: '0 auto' }} /><div style={{ maxWidth: '250px', margin: '0 auto' }}>
            <input type="file" id="myFile" name="filename" onChange={onFileChange} name="image" />
          </div></>
        }
        
        <div>
        <Button type="submit">{!state.isLoginPage ? 'Save' : 'Login'}</Button>
        </div>
      </Form>
    </div>
  );
};
