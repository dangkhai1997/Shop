import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  const user = useSelector((state) => state.auth.user);

  if (isPrivate && !user) {
    return <Redirect to="/" />;
  }
  if (!isPrivate && user) {
    return <Redirect to="/dashboard" />;
  }
  return <Route {...rest} component={Component} />;
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired
};

RouteWrapper.defaultProps = {
  isPrivate: false
};
