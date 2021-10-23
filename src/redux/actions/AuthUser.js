import { customerApi } from "../../api/customer.api";
import * as actionTypes from "../actionType";

export const authUserStart = () => {
  return {
    type: actionTypes.AUTH_USER_START
  };
};

export const loginUserSuccess = ({customerId, name,phoneNumber, avatar }) => {
  return {
    type: actionTypes.USER_LOGIN_SUCCESS,
    currentUser: {customerId, name,phoneNumber, avatar }
  };
};

export const loginFail = (error) => {
  return {
    type: actionTypes.USER_LOGIN_FAIL,
    err: error
  };
};

export const userLogin = (phoneNumber) => {
  return async (dispatch) => {
    dispatch(authUserStart());
    const response = await customerApi.login({phoneNumber});
    if (response?.customerId) {
      dispatch(loginUserSuccess(response));
    } else {
      dispatch(loginFail(response));
    }
  };
};

// export const signupSuccess = ({shopId,phoneNumber}) => {
//   return {
//     type: actionTypes.SIGNUP_SUCCESS,
//     currentUser: {shopId,phoneNumber}
//   };
// };

// export const signupFail = (error) => {
//   return {
//     type: actionTypes.SIGNUP_FAIL,
//     err: error
//   };
// };

export const userSignup = (name, phoneNumber, image, fileName) => {
  return async (dispatch) => {
    dispatch(authUserStart());
    const response = await customerApi.signup({name, phoneNumber, image,fileName});
    if (response?.shopId) {
      dispatch(loginUserSuccess(response));
    } else {
      dispatch(loginFail(response));
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