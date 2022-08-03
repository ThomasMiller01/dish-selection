import React, { Component, createRef } from "react";

import AuthService from "../AuthService/authservice";
import AlertMessage from "../AlertMessage/alertmessage";

import "./login.scss";

class Login extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.history = this.props.history;

    this.authApi = this.props.authApi;
    this.tokenName = this.props.tokenName;
    this.loginRoute = this.props.loginRoute;
    this.Auth = new AuthService(this.authApi, this.tokenName, this.loginRoute);

    this.successRoute = this.props.success;

    if (this.successRoute === undefined) this.successRoute = "/private";

    this.alertMessageRef = createRef();
  }

  state = {};

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.Auth.login(this.state.username, this.state.password)
      .then((res) => {
        this.props.history.replace(this.successRoute);
      })
      .catch((err) => {
        this.alertMessageRef.current.alert(
          "Invalid username or password.",
          "error",
          3000
        );
      });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount() {
    if (this.Auth.loggedIn()) this.history.replace(this.successRoute);
  }

  render() {
    return (
      <div className="login-container">
        <h3>Login</h3>
        <form onSubmit={this.handleFormSubmit}>
          <span>
            <div className="form-group">
              <AlertMessage ref={this.alertMessageRef} />
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                className="form-control"
                placeholder="Username"
                required
                autoFocus
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                required
                onChange={this.handleChange}
              />
            </div>
          </span>
          <button type="submit" className="btn btn-primary">
            Sign in
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
