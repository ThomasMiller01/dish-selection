import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { auth_api } from "./api_urls";

import ColorThemesHook from "library/src/components/ColorTheme/color_themes_hook";
import ProtectedRoute from "library/src/components/ProtectedRoute/ProtectedRoute";
import ErrorPage from "library/src/components/ErrorPage/errorpage";

import Home from "./home/home";
import LoginComponent from "./login/login";

// use color themes
import "library/src/styles/colors/colors.css";
import Recipes from "./recipes/recipes";
import Recipe from "./recipes/recipe";

const Router = ({ history }) => {
  return (
    <BrowserRouter history={history}>
      <ColorThemesHook id="recipe-selection">
        <Switch>
          <Redirect exact from="/" to="/login" />
          <Route path="/login" component={LoginComponent} />
          <ProtectedRoute
            path="/home"
            component={Home}
            authApi={auth_api}
            tokenName="recipe-selection-token"
          />
          <ProtectedRoute
            exact
            path="/recipes"
            component={Recipes}
            authApi={auth_api}
            tokenName="recipe-selection-token"
          />
          <ProtectedRoute
            path="/recipes/:recipe"
            component={Recipe}
            authApi={auth_api}
            tokenName="recipe-selection-token"
          />
          <Route
            render={() => (
              <ErrorPage
                file="App.js"
                error_title="Bad Request"
                error_number="404"
                error_description="The server cannot process the request due to something that is perceived to be a client error."
                full_size={true}
              />
            )}
          />
        </Switch>
      </ColorThemesHook>
    </BrowserRouter>
  );
};

export default Router;
