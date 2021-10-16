import * as actionTypes from "../actionType";

export const startLoading = () => {
  return {
    type: actionTypes.START_LOADING,
  };
};

export const stopLoading = () => {
  return {
    type: actionTypes.STOP_LOADING,
  };
};
