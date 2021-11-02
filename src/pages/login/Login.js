import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux";
import { Button, Form, Image, Modal, Input } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import './Login.css'
export const Login = (props) => {
  const [state, setState] = useState({
    name: "",
    phoneNumber: "",
    image: null,
    url: "/images/default.png",
    isLoginPage: false,
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

  const changePage = (e) => {
    e.preventDefault();
    setState({
      ...state,
      isLoginPage: !state.isLoginPage,
      isSubmit: false,
    });
  };

  const notifyModal = (
    <Modal centered={false} open={state.isShowModal} onClose={closeModal}>
      <Modal.Header>Notify!</Modal.Header>
      <Modal.Content>
        <Modal.Description>{state.notify}</Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={closeModal}>OK</Button>
      </Modal.Actions>
    </Modal>
  );

  return (
    <div>
      {notifyModal}
      <a href="javascript.void(0)" onClick={changePage}>
        {state.isLoginPage ? "Register" : "Login"}
      </a>

      {state.isSubmit && state.validate.isError ? (
        <div style={{ color: "red" }}>
          Please correct errors before submitting this form!
        </div>
      ) : (
        ""
      )}

      <Form onSubmit={submitHandler}>
        {!state.isLoginPage && (
          <Form.Field
            id="form-input-control-error-email"
            control={Input}
            label="Shop Name"
            placeholder="Shop Name"
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
          label="Phone Numbe"
          placeholder="Phone Numbe"
          onChange={handleChange}
          name="phoneNumber"
          error={
            state.isSubmit &&
            state.validate.isErrorPhoneNumber && {
              content: "Please enter valid number: 10 digits and start with 0!",
              pointing: "below",
            }
          }
        />
        {!state.isLoginPage && (
          <>
            <Image src={state.url} size="small" style={{ margin: "0 auto" }} />
            <div style={{ maxWidth: "250px", margin: "0 auto" }}>
              <Form.Field
                type="file"
                control={Input}
                id="myFile"
                placeholder="Phone Numbe"
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
