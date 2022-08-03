import React, { Component } from "react";

import { auth_api } from "../api_urls";

import Login from "library/src/components/Login/login";

import "./login.scss";

class LoginComponent extends Component {
  render() {
    return (
      <div className="login-page-container">
        <div className="login-section-container">
          <table>
            <tbody>
              <tr>
                <td>
                  <Login
                    authApi={auth_api}
                    history={this.props.history}
                    success="/home"
                    tokenName="recipe-selection-token"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default LoginComponent;
