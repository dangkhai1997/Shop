import * as actionTypes from "../actionType";

const initialState = {
  isToast: false,
  message: "",
};

export const toastReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_TOAST:
      return {
        ...state,
        isToast: true,
        message: action.message,
      };

    case actionTypes.STOP_TOAST:
      return {
        ...state,
        isToast: false,
        message: "",
      };

    default:
      return state;
  }
};
