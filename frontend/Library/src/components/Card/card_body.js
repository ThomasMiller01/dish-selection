import React, { Component } from "react";

import "./card.scss";

class CardBody extends Component {
  render() {
    let children = this.props.children;
    let customStyle = this.props.style;

    return (
      <div className="card-body" style={getStyle(customStyle)}>
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

export default CardBody;
