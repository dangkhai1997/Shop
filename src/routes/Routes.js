import React from "react";
import { Switch } from "react-router-dom";
import Route from "./RouteWrapper";
import { Login ,Admin} from "../pages";
export const Routes = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/admin" component={Admin} />
    </Switch>
  );
};
