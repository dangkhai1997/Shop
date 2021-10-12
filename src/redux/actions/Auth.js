import { shopApi } from "../../api/shop.api";
import * as actionTypes from "../actionType";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const loginSuccess = (currentUser) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    currentUser: currentUser
  };
};

export const loginFail = (error) => {
  return {
    type: actionTypes.LOGIN_FAIL,
    err: error
  };
};

export const login = (name, phoneNumber) => {
  return async (dispatch) => {
    dispatch(authStart());
    const response = await shopApi.login({name, phoneNumber});
    console.log(response);
    if (response?.user) {
      dispatch(loginSuccess(response.user));
    } else {
      dispatch(loginFail(response));
    }
  };
};

export const signupSuccess = (currentUser) => {
  return {
    type: actionTypes.SIGNUP_SUCCESS,
    currentUser: currentUser
  };
};

export const signupFail = (error) => {
  return {
    type: actionTypes.SIGNUP_FAIL,
    err: error
  };
};

export const signup = (email, password) => {
  // return async (dispatch) => {
  //   dispatch(authStart());
  //   const response = await firebaseSignup(email, password);
  //   if (response?.user) {
  //     dispatch(signupSuccess(response.user));
  //   } else {
  //     dispatch(signupFail(response));
  //   }
  // };
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
