import React, { Component } from "react";

import "./button.scss";

class Button extends Component {
  render() {
    let {
      children,
      action,
      level = "library-button",
      invertedStyle = false,
    } = this.props;

    let className = "btn " + this.getLevel(level);
    if (invertedStyle) className += " inverted";

    if (typeof action === "string") {
      return (
        <div className={className}>
          <a href={action} alt="Button Link">
            {children}
          </a>
        </div>
      );
    } else {
      return (
        <button className={className} onClick={action}>
          {children}
        </button>
      );
    }
  }

  getLevel = (level) => {
    switch (level) {
      case "default":
        return "btn-primary";

      case "info":
        return "btn-info";

      case "success":
        return "btn-success";

      case "warning":
        return "btn-warning";

      case "error":
        return "btn-danger";

      default:
        return level;
    }
  };
}

export default Button;
