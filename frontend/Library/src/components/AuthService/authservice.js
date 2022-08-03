import decode from "jwt-decode";

import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { gql } from "apollo-boost";

export default class AuthService {
  constructor(api, tokenName, loginRoute) {
    this.api = api;
    this.tokenName = tokenName;
    this.loginRoute = loginRoute;

    if (this.tokenName === undefined) this.tokenName = "accessToken";
    if (this.loginRoute === undefined) this.loginRoute = "login";

    this.authApi = new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({
        uri: this.api,
      }),
    });

    this.fetch = this.fetch.bind(this);
    this.login = this.login.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  login(username, password) {
    return this.authApi
      .query({
        query: gql`
          query ($username: String!, $password: String!) {
            login(username: $username, password: $password) {
              token
            }
          }
        `,
        variables: { username, password },
      })
      .then((res) => {
        let token = res.data.login.token;
        if (token !== "") {
          this.setToken(token);
          return Promise.resolve(res);
        } else {
          throw new Exception("Invalid credentials.");
        }
      });
  }

  roleAccess(role) {
    if (role !== undefined) {
      const token = this.getToken();
      const decoded = decode(token);
      if (
        decoded[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ] === role
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  rolesAccess = (roles) => {
    let canAccess = false;
    if (roles.length === 0) canAccess = true;

    roles.forEach((role) => {
      if (this.roleAccess(role)) canAccess = true;
    });
    return canAccess;
  };

  loggedIn() {
    const token = this.getToken();

    let exists = !!token;
    let expired = this.isTokenExpired(token);
    // todo: validate with auth api
    let valid = true;

    return exists && !expired && valid;
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  setToken(token) {
    localStorage.setItem(this.tokenName, token);
  }

  getToken() {
    return localStorage.getItem(this.tokenName);
  }

  logout() {
    localStorage.removeItem(this.tokenName);
  }

  getProfile() {
    return decode(this.getToken());
  }

  fetch(url, options) {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    if (this.loggedIn()) {
      headers["Authorization"] = "Bearer " + this.getToken();
    }

    return fetch(url, {
      headers,
      ...options,
    })
      .then(this._checkStatus)
      .then((response) => response.json());
  }

  _checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }
}
