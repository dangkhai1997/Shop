import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux";
import { Button, Form, Grid, Image, Segment } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

export const UserLogin = (props) => {
  const authUser = useSelector((state) => state.authUser);
  const history = useHistory();

  const [state, setState] = useState({
    name: "",
    phoneNumber: "",
    url: "/images/default.png",
    image: null,
    fileName: "",
  });

  const dispatch = useDispatch();
  const submitHandler = (event) => {
    event.preventDefault();

    if (!isValid()) {
      return;
    }

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

  const isValid = () => {
    let isValid = false;
    if (state.isLoginPage) {
      isValid = new RegExp("^((0)[0-9]{9})$").test(state.phoneNumber);
    } else {
      isValid =
        state.name !== "" &&
        state.image &&
        new RegExp("^((0)[0-9]{9})$").test(state.phoneNumber);
    }

    if (!isValid) {
      dispatch(
        actions.startToast(
          `Please enter ${
            state.isLoginPage ? "phone number " : "name, phone number, image "
          }!`
        )
      );
    }
    return isValid;
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
      history.push("/shops");
      return;
    }
  }, [authUser]);

  const changePage = (isLoginPage) => {
    setState({
      ...state,
      isLoginPage,
      isSubmit: false,
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
    <>
      <Grid columns="equal">
        <Grid.Column></Grid.Column>
        <Grid.Column width={8}>
          <Segment color="brown" style={{ marginTop: "20%" }}>
            <Button.Group style={{ marginTop: "10px", marginBottom: "10px" }}>
              <Button
                onClick={() => changePage(true)}
                active={state.isLoginPage}
                color="orange"
                basic={!state.isLoginPage}
              >
                Sign In
              </Button>
              <Button.Or />
              <Button
                onClick={() => changePage(false)}
                active={!state.isLoginPage}
                color="orange"
                basic={state.isLoginPage}
              >
                Sign Up
              </Button>
            </Button.Group>

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
                <div>
                  <input
                    type="file"
                    id="myFile"
                    onChange={onFileChange}
                    name="image"
                    style={{ marginBottom: "10px" }}
                  />
                  <Image
                    src={state.url}
                    size="medium"
                    bordered
                    centered
                    style={{ marginBottom: "10px" }}
                  />
                </div>
              )}
              <div>
                <Button
                  color="brown"
                  type="submit"
                  style={{ marginTop: "10px" }}
                >
                  {!state.isLoginPage ? "Submit" : "Login"}
                </Button>
              </div>
            </Form>
          </Segment>
        </Grid.Column>
        <Grid.Column></Grid.Column>
      </Grid>
    </>
  );
};
