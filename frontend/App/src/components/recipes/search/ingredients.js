import React, { Component } from "react";

class Ingredients extends Component {
  state = {
    ingredients: [],
  };

  getState = () => {
    let state = { ...this.state };
    return state;
  };

  render() {
    return <p>Ingredients search missing.</p>;
  }
}

export default Ingredients;
