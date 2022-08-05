import React, { Component } from "react";

class Tags extends Component {
  state = {
    tags: [],
  };

  getState = () => {
    let state = { ...this.state };
    return state;
  };

  render() {
    return <p>Tags search missing.</p>;
  }
}

export default Tags;
