import { shopApi } from "../../api/shop.api";
import * as actionTypes from "../actionType";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const loginSuccess = ({shopId,phoneNumber}) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    currentUser: {shopId,phoneNumber}
  };
};

export const loginFail = (error) => {
  return {
    type: actionTypes.LOGIN_FAIL,
    err: error
  };
};

export const login = (phoneNumber) => {
  return async (dispatch) => {
    dispatch(authStart());
    const response = await shopApi.login({phoneNumber});
    if (response?.shopId) {
      dispatch(loginSuccess(response));
    } else {
      dispatch(loginFail(response));
    }
  };
};

export const signupSuccess = ({shopId,phoneNumber}) => {
  return {
    type: actionTypes.SIGNUP_SUCCESS,
    currentUser: {shopId,phoneNumber}
  };
};

export const signupFail = (error) => {
  return {
    type: actionTypes.SIGNUP_FAIL,
    err: error
  };
};

export const signup = (name, phoneNumber, image) => {
  return async (dispatch) => {
    dispatch(authStart());
    const response = await shopApi.signup({name, phoneNumber, image});
    if (response?.shopId) {
      dispatch(signupSuccess(response));
    } else {
      dispatch(signupFail(response));
    }
  };
};

export const userLogout = () => {
  return {
    type: actionTypes.USER_LOGOUT
  };
};

export const logout = () => {
  // return async (dispatch) => {
  //   await firebaseSignOut();
  //   dispatch(userLogout());
  // };
};

export const googleAuth = (user) => {
  return {
    type: actionTypes.GOOGLE_LOGIN,
    googleUser: user
  };
};
