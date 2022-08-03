## AuthService

Class that manages authentication via jwt tokens. It can store and load tokens from the localstorage.

#### Constructor

| name       | type     | default       | comment                                       |
| ---------- | -------- | ------------- | --------------------------------------------- |
| api        | `string` |               | required, authentication api url              |
| tokenName  | `string` | "accessToken" | the key name of the token in the localstorage |
| loginRoute | `string` | "login"       | the route to the login endpoint               |

#### Methods

| name        | parameters                                           | comment                                                       |
| ----------- | ---------------------------------------------------- | ------------------------------------------------------------- |
| login       | (username: `string`, password: `string`): `response` |                                                               |
| logout      | (): `void`                                           |                                                               |
| loggedIn    | (): `bool`                                           | `true`: user is logged in<br />`false`: user is not logged in |
| getToken    | (): `string`                                         |                                                               |
| setToken    | (token: `string`): `void`                            |                                                               |
| getProfile  | (): `object`                                         |                                                               |
| roleAccess  | (role: `string`): `bool`                             | `true`: access granted<br />`false`: access denied            |
| rolesAccess | (roles: `string[]`): `bool`                          | `true`: access granted<br />`false`: access denied            |

#### Examples

```js
import AuthService from "library/src/components/AuthService/authservice";
```

Create a new AuthService:

```js
let Auth = new AuthService("http://localhost:5000/auth");

let Auth = new AuthService(
  "http://localhost:5000/auth",
  "lib_token",
  "/user/login"
);
```

Check if user is logged in:

```js
// single role
if (Auth.loggedIn()) {
  console.log("user is logged in");
} else {
  console.log("user is not logged in");
}
```

Check if the current user can access the following roles:

```js
// single role
if (Auth.roleAccess("Admin")) {
  console.log("access granted");
} else {
  console.log("access denied");
}

// multiple roles
if (Auth.rolesAccess(["Admin", "Moderator"])) {
  console.log("access granted");
} else {
  console.log("access denied");
}
```

## ProtectedRoute

Protect a route of a router so that only logged in users can access it. It can also be further protected so that only users with specific roles can access it.

#### Parameters

| name       | type       | default | comment                                                                                 |
| ---------- | ---------- | ------- | --------------------------------------------------------------------------------------- |
| path       | `string`   |         | required, the route at which the component will be rendered                             |
| roles      | `string[]` | []      | list of roles that can access this route<br /><i>if empty, <b>anyone</b> can access</i> |
| loginRoute | `string`   | "login" | the route to the login endpoint                                                         |

#### Examples

```js
import ProtectedRoute from "library/src/components/ProtectedRoute/ProtectedRoute";
```

```js
<BrowserRouter history={history}>
  <Switch>
    <Route path="/home" component={HomeComponent} />
    <ProtectedRoute path="/secret" component={SecretComponent} />
    <ProtectedRoute
      path="/secret"
      component={SecretComponent}
      roles={["Admin", "Moderator"]}
    />
    <ProtectedRoute
      path="/anothersecret"
      component={AnotherSecretComponent}
      loginRoute="user/login"
    />
  </Switch>
</BrowserRouter>
```

## Login

A simple login card.

#### Parameters

| name       | type     | default       | comment                                                                                        |
| ---------- | -------- | ------------- | ---------------------------------------------------------------------------------------------- |
| success    | `string` | "/private"    | the route that will be called once login was successful                                        |
| authApi    | `string` |               | required, authentication api url                                                               |
| tokenName  | `string` | "accessToken" | the key name of the token in the localstorage                                                  |
| loginRoute | `string` | "login"       | the route to the login endpoint                                                                |
| history    | `object` |               | required, the history of the parent component <i>(needs to be passed down from the router)</i> |

#### Examples

```js
import Login from "library/src/components/Login/login";
```

```html
// with default values:
<Login authApi="http://localhost:5000/auth" history="{this.props.history}" />

// with custom token name
<Login
  authApi="http://localhost:5000/auth"
  history="{this.props.history}"
  tokenName="lib_token"
/>

// with custom routes
<Login
  authApi="http://localhost:5000/auth"
  history="{this.props.history}"
  success="private/home"
  loginRoute="user/login"
/>
```

<Login authApi="http://localhost:5000/auth" tokenName="lib_token"></Login>

## Logout

A simple logout button.

#### Parameters

| name       | type     | default       | comment                                       |
| ---------- | -------- | ------------- | --------------------------------------------- |
| authApi    | `string` |               | required, authentication api url              |
| tokenName  | `string` | "accessToken" | the key name of the token in the localstorage |
| loginRoute | `string` | "login"       | the route to the login endpoint               |

#### Examples

```js
import Logout from "library/src/components/Logout/logout";
```

```html
// with default values:
<Logout authApi="http://localhost:5000/auth" />

// with custom token name
<Logout authApi="http://localhost:5000/auth" tokenName="lib_token" />

// with custom routes
<Logout authApi="http://localhost:5000/auth" loginRoute="user/login" />
```

<Logout authApi="http://localhost:5000/auth" tokenName="lib_token"></Logout>

## User Badge

A simple badge that displays the currently logged in user and also provides a link to the details page of said user.

#### Parameters

| name      | type     | default          | comment                                     |
| --------- | -------- | ---------------- | ------------------------------------------- |
| authApi   | `string` |                  | required, authentication api url            |
| userRoute | `string` | "/private/user/" | route, where a single user can be displayed |
| example   | `bool`   | false            | display example badge, only for showcase    |

#### Examples

```js
import UserBadge from "library/src/components/UserData/userbadge";
```

```html
<UserBadge authApi="http://localhost:5000/auth" />
```

<div className="background-card">
  <UserBadge authApi="http://localhost:5000/auth" example="true"></UserBadge>
</div>

## User Data

A simple UserData container that has more information about the user like role and last login.

#### Parameters

| name     | type     | default | comment                                                |
| -------- | -------- | ------- | ------------------------------------------------------ |
| authApi  | `string` |         | required, authentication api url                       |
| username | `string` |         | the name of the user which information should be shown |
| example  | `bool`   | false   | display example badge, only for showcase               |

#### Examples

```js
import UserData from "library/src/components/UserData/userdata";
```

Example UserData container:

```html
<UserData username="ExampleUser" authApi="http://localhost:5000/auth" />
```

<UserData username="ExampleUser" authApi="http://localhost:5000/auth" example="true"></UserData>

**Use the UserData container with routing:**

The user data will be updated, when the route parameter changes (from `/private/user/Thomas` to `/private/user/ExampleUser`)

```js
import React, { Component, createRef } from "react";

import { auth_api } from "../../../api_urls";

import UserData from "library/src/components/UserData/userdata";
import PageContainer from "library/src/components/PageContainer/pagecontainer";

class UserAccount extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.userDataRef = createRef();
  }

  render() {
    return (
      <PageContainer>
        <div className="row justify-content-md-center">
          <div className="col-xl-6 col-lg-8 col-sm-12">
            <UserData
              username={this.props.match.params.username}
              authApi={auth_api}
              ref={this.userDataRef}
            />
          </div>
        </div>
      </PageContainer>
    );
  }

  shouldComponentUpdate(route, _) {
    if (this.userDataRef.current.username !== route.match.params.username) {
      this.userDataRef.current.username = route.match.params.username;
      this.userDataRef.current.update();
    }
    return true;
  }
}

export default UserAccount;
```

<style>
  .background-card {
    width: 100%;    
    height: fit-content;
    padding: 5px;
    background-color: var(--background);
    border-radius: 15px;
  }
</style>
