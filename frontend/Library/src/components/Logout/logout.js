import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import AuthService from "../AuthService/authservice";

import "./logout.scss";

class Logout extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.authApi = this.props.authApi;
    this.tokenName = this.props.tokenName;
    this.loginRoute = this.props.loginRoute;
    if (this.loginRoute === undefined) this.loginRoute = "login";
    this.Auth = new AuthService(this.authApi, this.tokenName, this.loginRoute);
  }

  state = {
    navigate: false,
  };

  handleLogout = () => {
    this.Auth.logout();
    this.setState({ navigate: true });
  };

  render() {
    if (this.state.navigate) {
      return <Redirect to={"/" + this.loginRoute}></Redirect>;
    }
    return (
      <button
        type="button"
        className="btn btn-danger logout-button"
        onClick={this.handleLogout}
      >
        Logout
      </button>
    );
  }
}

export default Logout;
