import React, { Component } from "react";

import { auth_api } from "../api_urls";

import ColorThemesPicker from "library/src/components/ColorTheme/color_themes_picker";
import Logout from "library/src/components/Logout/logout";

class Sidebar extends Component {
  render() {
    return (
      <div>
        <Logout authApi={auth_api} tokenName="recipe-selection-token" />
        <ColorThemesPicker id="recipe-selection" />
      </div>
    );
  }
}

export default Sidebar;
