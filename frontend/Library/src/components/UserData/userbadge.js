import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import AuthService from "../AuthService/authservice";

import "./userdata.scss";

class UserBadge extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.userRoute = this.props.userRoute;
    if (this.userRoute === undefined) this.userRoute = "/private/user/";
    this.auth = new AuthService(this.props.authApi);

    this.example = this.props.example ? this.props.example : false;

    if (!this.example) {
      this.state.username =
        this.auth.getProfile()[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
        ];
    } else {
      this.state.username = "ExampleUser";
    }
  }

  state = {
    username: "",
  };

  render() {
    return (
      <div className="user-badge-container">
        <NavLink to={this.userRoute + this.state.username}>
          {this.state.username}
        </NavLink>
      </div>
    );
  }
}

export default UserBadge;
