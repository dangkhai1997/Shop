import * as actionTypes from "../actionType";

const initialState = {
  counter: 0,
  loading: false,
};

export const loadReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_LOADING:
      return {
        ...state,
        counter: state.counter + 1,
        loading: true,
      };

    case actionTypes.STOP_LOADING:
      if (state.counter === 1 || state.counter === 0) {
        return {
          ...state,
          counter: 0,
          loading: false,
        };
      }

      return {
        ...state,
        counter: state.counter - 1,
      };
    default:
      return state;
  }
};
