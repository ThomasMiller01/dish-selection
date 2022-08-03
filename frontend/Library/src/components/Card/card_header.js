import React, { Component } from "react";

import "./card.scss";

class Cardheader extends Component {
  render() {
    let children = this.props.children;
    let centered = this.props.centered;
    let customStyle = this.props.style;

    let className = "card-header py-3";
    if (centered !== false) {
      className +=
        " d-flex flex-row align-items-center justify-content-between";
    }

    return (
      <div className={className} style={getStyle(customStyle)}>
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

export default Cardheader;
