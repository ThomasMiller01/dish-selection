import React, { Component } from "react";

import "./card.scss";

class CardFooter extends Component {
  render() {
    let children = this.props.children;
    let customStyle = this.props.style;

    return (
      <div
        className="container-fluid card-footer-container"
        style={getStyle(customStyle)}
      >
        <p className="card-text">
          <small>{children}</small>
        </p>
      </div>
    );
  }
}

const getStyle = (customStyle) => {
  let style = {};

  if (customStyle !== undefined) {
    style = { ...style, ...customStyle };
  }
  return style;
};

export default CardFooter;
