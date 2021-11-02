import * as actionTypes from "../actionType";

export const startToast = (message) => {
  return {
    type: actionTypes.START_TOAST,
    message
  };
};

export const stopToast = () => {
    return {
      type: actionTypes.STOP_TOAST
    };
  };