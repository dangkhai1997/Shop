import React from "react";
import { Switch } from "react-router-dom";
import Route from "./RouteWrapper";
import { Login ,Admin, UserLogin,Cart} from "../pages";
export const Routes = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/admin" component={Admin} />
      <Route path="/user-login" component={UserLogin} />
      <Route path="/cart" component={Cart} />
    </Switch>
  );
};
