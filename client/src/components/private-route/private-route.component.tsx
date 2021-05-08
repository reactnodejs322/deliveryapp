import React from "react";

import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { Route, Redirect, RouteProps } from "react-router-dom";

export type PrivateRouteProps = {
  component: React.ElementType;
  currentUser?: any;
} & RouteProps;

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  currentUser,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      currentUser ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps, null)(PrivateRoute);
