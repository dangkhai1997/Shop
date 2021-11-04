import React from "react";
import { Switch, Redirect } from "react-router-dom";
import Route from "./RouteWrapper";
import {
  Login,
  Admin,
  UserLogin,
  Cart,
  Tracking,
  Shop,
  NotFound,
  Home,
  AllShop,
} from "../pages";
export const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to="/user-login" />
      </Route>
      <Route path="/login" component={Login} />
      <Route path="/admin" component={Admin} />
      <Route path="/user-login" component={UserLogin} />
      <Route path="/cart" component={Cart} />
      <Route path="/tracking" component={Tracking} />
      <Route path="/shop" component={Shop} />
      <Route path="/shops" component={AllShop} />
      <Route exact path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
};
