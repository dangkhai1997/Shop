import { combineReducers } from "redux";

import { authReducer } from "./Auth";

export const rootReducer = combineReducers({
  auth: authReducer,
});
