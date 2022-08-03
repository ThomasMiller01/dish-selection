import React, { Component, createRef } from "react";
import { findDOMNode } from "react-dom";
import highlight from "highlight.js";

export default class Highlight extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.codeRef = createRef();
  }

  componentDidMount() {
    highlight.initHighlighting.called = false;
    highlight.highlightBlock(findDOMNode(this.codeRef.current));
  }

  componentDidUpdate() {
    highlight.initHighlighting.called = false;
    highlight.highlightBlock(findDOMNode(this.codeRef.current));
  }

  render() {
    const { children, language } = this.props;

    if (language === undefined) language = "js";

    return (
      <pre style={{ borderRadius: "5px" }}>
        <code className={language} ref={this.codeRef}>
          {children}
        </code>
      </pre>
    );
  }
}
