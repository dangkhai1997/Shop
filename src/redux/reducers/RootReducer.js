import { combineReducers } from "redux";

import { authReducer } from "./Auth";
import { loadReducer } from "./Load";
import { authUserReducer } from "./AuthUser";
import { toastReducer } from "./Toast";

export const rootReducer = combineReducers({
  auth: authReducer,
  load: loadReducer,
  authUser: authUserReducer,
  toast: toastReducer,
});
