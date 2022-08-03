import React, { Component } from "react";

import "./pagecontainer.css";

class PageContainer extends Component {
  render() {
    const { children, className } = this.props;
    let fullsize = this.props.fullsize;
    if (typeof fullsize === "string")
      fullsize =
        fullsize === "true" ? true : fullsize === "false" ? false : fullsize;

    let padding = this.props.padding;
    if (typeof padding === "string")
      padding =
        padding === "true" ? true : padding === "false" ? false : padding;

    let joinedClassName = "page-container";
    if (className !== undefined) joinedClassName += " " + className;

    return (
      <div className={joinedClassName} style={pageStyle(padding, fullsize)}>
        {children}
      </div>
    );
  }
}

const pageStyle = (padding, fullsize) => {
  let style = {
    padding: "10px",
  };

  if (padding === false) {
    delete style.padding;
  }

  if (fullsize) {
    style.minHeight = "100vh";
  }

  return style;
};

export default PageContainer;
