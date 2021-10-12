import React from "react";
import { Switch } from "react-router-dom";
import Route from "./RouteWrapper";
import { Login } from "../pages";
export const Routes = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
    </Switch>
  );
};
