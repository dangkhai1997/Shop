import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux";
import {
  Button,
  Form,
  Image,
  Modal,
  Input,
  Grid,
  Segment,
} from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import "./Login.css";
export const Login = (props) => {
  const [state, setState] = useState({
    name: "",
    phoneNumber: "",
    image: null,
    url: "/images/default.png",
    isLoginPage: true,
    isShowModal: false,
    notify: "",
    isSubmit: false,
    fileName: "",
    validate: {
      isError: false,
      isErrorImage: false,
      isErrorPhoneNumber: false,
      isErrorName: false,
    },
  });

  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  useEffect(() => {
    if (!state.isSubmit) {
      return;
    }

    if (auth.error) {
      setState({
        ...state,
        isShowModal: true,
        notify: auth.error,
      });
      return;
    }

    if (auth.user.shopId) {
      setState({
        ...state,
        isShowModal: true,
        notify: `${state.isLoginPage ? "Login" : "Register"} successful!`,
      });
      return;
    }

    setState({
      ...state,
      isShowModal: false,
    });
  }, [auth]);

  useEffect(() => {
    const validate = {
      isError: false,
      isErrorImage: false,
      isErrorPhoneNumber: false,
      isErrorName: false,
    };

    if (state.name === "" && !state.isLoginPage) {
      validate.isErrorName = true;
    }

    if (!state.image && !state.isLoginPage) {
      validate.isErrorImage = true;
    }

    if (state.phoneNumber === "") {
      validate.isErrorPhoneNumber = true;
    } else {
      validate.isErrorPhoneNumber = !new RegExp("^((0)[0-9]{9})$").test(
        state.phoneNumber
      );
    }

    validate.isError =
      validate.isErrorName ||
      validate.isErrorImage ||
      validate.isErrorPhoneNumber;
    setState({
      ...state,
      validate: validate,
    });
  }, [state.name, state.phoneNumber, state.image]);

  const dispatch = useDispatch();
  const submitHandler = (event) => {
    event.preventDefault();

    setState({
      ...state,
      isSubmit: true,
    });

    if (state.validate.isError) {
      return;
    }

    state.isLoginPage
      ? dispatch(actions.login(state.phoneNumber))
      : dispatch(
          actions.signup(
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

  const closeModal = () => {
    setState({
      ...state,
      isShowModal: false,
    });

    const {
      user: { shopId },
    } = auth || {};
    shopId && history.push(`/admin/${shopId}`);
  };

  const changePage = (isLoginPage) => {
    setState({
      ...state,
      isLoginPage,
      isSubmit: false,
    });
  };

  const notifyModal = (
    <Modal
      size="mini"
      centered={false}
      open={state.isShowModal}
      onClose={closeModal}
    >
      <Modal.Header>Notify!</Modal.Header>
      <Modal.Content>
        <Modal.Description>{state.notify}</Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={closeModal} color="brown">
          OK
        </Button>
      </Modal.Actions>
    </Modal>
  );

  return (
    <>
      {notifyModal}

      <Grid columns="equal">
        <Grid.Column></Grid.Column>
        <Grid.Column width={8}>
          <Segment color="brown" style={{ marginTop: "30%" }}>
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
                <Form.Field
                  id="form-input-control-error-email"
                  control={Input}
                  label="Name"
                  placeholder="Name"
                  onChange={handleChange}
                  name="name"
                  error={
                    state.isSubmit &&
                    state.validate.isErrorName && {
                      content: "Please enter shop name",
                      pointing: "below",
                    }
                  }
                />
              )}
              <Form.Field
                id="form-input-control-error-email"
                control={Input}
                label="Phone Number"
                placeholder="Phone Number"
                onChange={handleChange}
                name="phoneNumber"
                error={
                  state.isSubmit &&
                  state.validate.isErrorPhoneNumber && {
                    content:
                      "Please enter valid number: 10 digits and start with 0!",
                    pointing: "below",
                  }
                }
              />
              {!state.isLoginPage && (
                <>
                  <Form.Field
                    type="file"
                    control={Input}
                    id="myFile"
                    label="Logo"
                    placeholder="Logo"
                    onChange={onFileChange}
                    name="image"
                    error={
                      state.isSubmit &&
                      state.validate.isErrorImage && {
                        content: "Please choose file to upload",
                        pointing: "below",
                      }
                    }
                  />
                  <Image src={state.url} size="medium" bordered centered />
                </>
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
