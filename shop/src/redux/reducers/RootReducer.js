import { combineReducers } from "redux";

import { authReducer } from "./Auth";
import { loadReducer } from "./Load";

export const rootReducer = combineReducers({
  auth: authReducer,
  load: loadReducer
});
