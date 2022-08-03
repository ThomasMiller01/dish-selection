import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import ColorThemes from "./color_themes";

import "../../styles/colors/colors.css";

class ColorThemesHook extends Component {
  constructor(props) {
    super();
    this.props = props;

    let id = this.props.id ? this.props.id : "popholmes";

    let colorThemes = new ColorThemes({ id: id });
    this.update = colorThemes.update;

    this.state = {
      themes: colorThemes.themes,
    };
  }

  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    this.update();
  }

  state = {
    themes: [],
  };

  render() {
    return this.props.children;
  }
}

export default withRouter(ColorThemesHook);
