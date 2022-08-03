import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";

import AuthService from "../AuthService/authservice";

class ProtectedRoute extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.authApi = this.props.authApi;
    this.tokenName = this.props.tokenName;
    this.loginRoute = this.props.loginRoute;

    this.Auth = new AuthService(this.authApi, this.tokenName, this.loginRoute);

    if (this.props.roles !== undefined) this.state.roles = this.props.roles;

    this.loginRoute = this.props.loginRoute;
    if (this.loginRoute === undefined) this.loginRoute = "/login";
  }

  state = { isAuth: false, roles: [] };

  componentDidMount() {
    this.check();
  }

  componentDidUpdate() {
    this.check();
  }

  check() {
    if (this.Auth.loggedIn()) {
      if (this.Auth.rolesAccess(this.state.roles)) {
        if (!this.state.isAuth) this.setState({ isAuth: true });
      } else {
        if (this.state.isAuth) this.setState({ isAuth: false });
        this.props.history.replace(this.loginRoute);
      }
    } else {
      if (this.state.isAuth) this.setState({ isAuth: false });
      this.props.history.replace(this.loginRoute);
    }
  }

  render() {
    if (this.state.isAuth) {
      return <Route path={this.props.path} component={this.props.component} />;
    } else {
      return <React.Fragment />;
    }
  }
}

export default withRouter(ProtectedRoute);
