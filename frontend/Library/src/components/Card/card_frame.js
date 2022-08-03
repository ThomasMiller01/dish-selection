import React, { Component } from "react";

import "./card.scss";

class CardFrame extends Component {
  render() {
    let children = this.props.children;
    let customStyle = this.props.style;

    return (
      <div
        className="card shadow mb-4 text-start card-container"
        style={getStyle(customStyle)}
      >
        {children}
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

export default CardFrame;
