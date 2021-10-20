import * as actionTypes from "../actionType";

const initialState = {
  user: "",
  error: null,
  loading: false
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.currentUser,
        error: null
      };
    case actionTypes.LOGIN_FAIL:
      return {
        ...state,
        user: "",
        loading: false,
        error: action.err
      };
    case actionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        user: action.currentUser,
        loading: false,
        error: null
      };
    case actionTypes.SIGNUP_FAIL:
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
