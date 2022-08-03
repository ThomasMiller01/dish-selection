import React, { Component } from "react";

import ColorThemes from "./color_themes";
import Card from "../Card/card";

import "./color_themes.scss";

class ColorThemesPicker extends Component {
  constructor(props) {
    super();
    this.props = props;

    let id = this.props.id ? this.props.id : "popholmes";

    this.colorThemes = new ColorThemes({
      updateSelected: this.updateSelected,
      setCustomColors: this.setCustomColors,
      id: id,
    });

    this.set = this.colorThemes.set;

    this.state.themes = this.colorThemes.themes;
  }

  componentDidMount() {
    this.colorThemes.update();
  }

  updateSelected = (theme) => {
    if (theme === "Custom") {
      this.setState({ selected: theme, show_custom: true });
    } else {
      this.setState({ selected: theme, show_custom: false });
    }
  };

  state = {
    themes: [],
    selected: "",
    show_custom: false,
    custom: {
      background: "",
      background_light: "",
      background_container: "",
      highlight: "",
      text: "",
      text_light: "",
      text_dark: "",
    },
  };

  onChangeCustomColor = (type, value) => {
    let custom = this.state.custom;
    custom[type] = value;
    this.setState({ custom });
  };

  updateCustomColors = () => {
    this.colorThemes.setCustom(this.state.custom);
  };

  setCustomColors = (colors) => {
    this.setState({ custom: colors });
  };

  show_custom = () => {
    this.setState({ show_custom: true });
    this.updateCustomColors();
  };

  hide_custom = () => {
    this.setState({ show_custom: false });
  };

  render() {
    return (
      <Card
        title={
          <span>
            Color-Themes Picker -{" "}
            <small>
              <b>{this.state.selected}</b>
            </small>
          </span>
        }
        footer={
          <span>
            Selected: <b>{this.state.selected}</b>
          </span>
        }
      >
        {this.state.themes.map((theme, index) => (
          <button
            key={index}
            onClick={() => {
              this.hide_custom();
              this.set(theme.value);
            }}
            style={buttonStyle(theme.value)}
            className="btn btn-info"
          >
            {theme.name}
          </button>
        ))}
        <button
          onClick={this.show_custom}
          style={buttonStyle("custom")}
          className="btn btn-info"
        >
          Custom
        </button>
        {this.state.show_custom && (
          <div className="row">
            <div className="col color-themes-custom">
              <div className="input-group mb-3">
                <span className="input-group-text">Background</span>
                <input
                  type="color"
                  className="form-control form-control-color"
                  value={this.state.custom.background}
                  onChange={(e) =>
                    this.onChangeCustomColor("background", e.target.value)
                  }
                />
                <input
                  type="text"
                  className="form-control value"
                  value={this.state.custom.background}
                  onChange={(e) =>
                    this.onChangeCustomColor("background", e.target.value)
                  }
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Background Light</span>
                <input
                  type="color"
                  className="form-control form-control-color"
                  value={this.state.custom.background_light}
                  onChange={(e) =>
                    this.onChangeCustomColor("background_light", e.target.value)
                  }
                />
                <input
                  type="text"
                  className="form-control value"
                  value={this.state.custom.background_light}
                  onChange={(e) =>
                    this.onChangeCustomColor("background_light", e.target.value)
                  }
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Background Container</span>
                <input
                  type="color"
                  className="form-control form-control-color"
                  value={this.state.custom.background_container}
                  onChange={(e) =>
                    this.onChangeCustomColor(
                      "background_container",
                      e.target.value
                    )
                  }
                />
                <input
                  type="text"
                  className="form-control value"
                  value={this.state.custom.background_container}
                  onChange={(e) =>
                    this.onChangeCustomColor(
                      "background_container",
                      e.target.value
                    )
                  }
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Highlight</span>
                <input
                  type="color"
                  className="form-control form-control-color"
                  value={this.state.custom.highlight}
                  onChange={(e) =>
                    this.onChangeCustomColor("highlight", e.target.value)
                  }
                />
                <input
                  type="text"
                  className="form-control value"
                  value={this.state.custom.highlight}
                  onChange={(e) =>
                    this.onChangeCustomColor("highlight", e.target.value)
                  }
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Text</span>
                <input
                  type="color"
                  className="form-control form-control-color"
                  value={this.state.custom.text}
                  onChange={(e) =>
                    this.onChangeCustomColor("text", e.target.value)
                  }
                />
                <input
                  type="text"
                  className="form-control value"
                  value={this.state.custom.text}
                  onChange={(e) =>
                    this.onChangeCustomColor("text", e.target.value)
                  }
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Text Light</span>
                <input
                  type="color"
                  className="form-control form-control-color"
                  value={this.state.custom.text_light}
                  onChange={(e) =>
                    this.onChangeCustomColor("text_light", e.target.value)
                  }
                />
                <input
                  type="text"
                  className="form-control value"
                  value={this.state.custom.text_light}
                  onChange={(e) =>
                    this.onChangeCustomColor("text_light", e.target.value)
                  }
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Text Dark</span>
                <input
                  type="color"
                  className="form-control form-control-color"
                  value={this.state.custom.text_dark}
                  onChange={(e) =>
                    this.onChangeCustomColor("text_dark", e.target.value)
                  }
                />
                <input
                  type="text"
                  className="form-control value"
                  value={this.state.custom.text_dark}
                  onChange={(e) =>
                    this.onChangeCustomColor("text_dark", e.target.value)
                  }
                />
              </div>
              <div className="input-group mb-3">
                <button className="btn" onClick={this.updateCustomColors}>
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </Card>
    );
  }
}

const buttonStyle = (theme) => {
  let style = {
    margin: "5px",
    backgroundColor: "var(--" + theme + "_background)",
    color: "var(--" + theme + "_text_light)",
  };

  if (theme === "custom") {
    style.backgroundColor = "#EFA00B";
    style.color = "#000000";
  }

  return style;
};

export default ColorThemesPicker;
