import * as actionTypes from "../actionType";

const initialState = {
  user: "",
  error: null,
  loading: false
};

export const authUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_USER_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case actionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.currentUser,
        error: null
      };
    case actionTypes.USER_LOGIN_FAIL:
      return {
        ...state,
        user: "",
        loading: false,
        error: action.err
      };
    case actionTypes.USER_SIGNUP_SUCCESS:
      return {
        ...state,
        user: action.currentUser,
        loading: false,
        error: null
      };
    case actionTypes.USER_SIGNUP_FAIL:
      return {
        ...state,
        user: "",
        loading: false,
        error: action.err
      };
    case actionTypes.USER_LOGOUT:
      return {
        ...state,
        user: "",
        error: null,
        loading: false
      };
    default:
      return state;
  }
};
