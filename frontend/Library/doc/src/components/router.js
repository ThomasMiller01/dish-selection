import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import ColorThemesHook from "library/src/components/ColorTheme/color_themes_hook";

import Home from "./structure/home";
import Page from "./page/page";

const Router = ({ history }) => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL} history={history}>
      <ColorThemesHook id="library-documentation">
        <Switch>
          <Redirect exact path="/home" to="/" />
          <Route exact path="/" component={Home} />
          <Route path="/:content" component={Page} />
        </Switch>
      </ColorThemesHook>
    </BrowserRouter>
  );
};

export default Router;
