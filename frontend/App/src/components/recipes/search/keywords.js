import React, { Component } from "react";

class Keywords extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.search = this.props.search;
  }

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

  inputKeyPress = (e) => {
    if (e.key === "Enter") {
      this.search();
    }
  };

  render() {
    return (
      <div className="input-group mb-3">
        <span className="input-group-text">Search</span>
        <input
          type="text"
          className="form-control"
          value={this.state.keywords}
          onChange={this.onChangeKeywords}
          onKeyDown={this.inputKeyPress}
        />
      </div>
    );
  }
}

export default Keywords;
