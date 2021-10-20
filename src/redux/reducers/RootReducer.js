import { combineReducers } from "redux";

import { authReducer } from "./Auth";
import { loadReducer } from "./Load";
import { authUserReducer } from "./AuthUser";

export const rootReducer = combineReducers({
  auth: authReducer,
  load: loadReducer,
  authUser: authUserReducer,
});
