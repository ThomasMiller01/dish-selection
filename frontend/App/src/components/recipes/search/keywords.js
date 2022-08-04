import React, { Component } from "react";

class Keywords extends Component {
  state = {
    keywords: "",
  };

  getState = () => {
    let state = { ...this.state };
    return state;
  };

  onChangeKeywords = (e) => {
    let value = e.target.value;
    this.setState({ keywords: value });
  };

  render() {
    return (
      <div className="input-group mb-3">
        <span className="input-group-text">Keywords</span>
        <input
          type="text"
          className="form-control"
          value={this.state.keywords}
          onChange={this.onChangeKeywords}
        />
      </div>
    );
  }
}

export default Keywords;
