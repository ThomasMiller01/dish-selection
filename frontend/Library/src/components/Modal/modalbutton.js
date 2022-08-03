import React, { Component } from "react";

import "./modal.scss";

class ModalButton extends Component {
  render() {
    let id = this.props.id;
    let invisible = this.props.invisible;
    let children = this.props.children;
    let customClassName = this.props.className;
    let action = this.props.action;
    if (typeof action === "string") action = new Function(action);
    let style = this.props.style;

    let className = "btn btn-primary";
    if (customClassName !== undefined) className += " " + customClassName;

    return (
      <button
        type="button"
        className={className}
        data-bs-toggle="modal"
        data-bs-target={"#" + id + "_modal"}
        style={buttonStyle(invisible, style)}
        onClick={action}
      >
        {children}
      </button>
    );
  }
}

const buttonStyle = (invisible, customStyle) => {
  let style = {
    width: "fit-content",
  };

  if (customStyle !== undefined) {
    style = { ...style, ...customStyle };
  }

  if (invisible) {
    style.background = "none";
    style.border = "none";
  }

  return style;
};

export default ModalButton;
