import React, { Component } from "react";

class Preptime extends Component {
  state = {
    value: "",
    comparator: "EQUALS",
  };

  getState = () => {
    let state = { ...this.state };
    state.value = state.value === "" ? -1 : state.value;
    return state;
  };

  onChangeValue = (e) => {
    let value = e.target.value;

    if (value !== "") {
      value = parseInt(value);
    }

    this.setState({ value });
  };

  onChangeComparator = (e) => {
    let value = e.target.value;
    this.setState({ comparator: value });
  };

  render() {
    return (
      <div className="input-group mb-3">
        <label className="input-group-text">Zubereitungszeit</label>
        <select
          className="form-select"
          value={this.state.comparator}
          onChange={this.onChangeComparator}
        >
          <option value="EQUALS">=</option>
          <option value="NOT_EQUALS">!=</option>
          <option value="GREATER">&gt;</option>
          <option value="GREATER_EQUALS">&gt;=</option>
          <option value="LESSER">&lt;</option>
          <option value="LESSER_EQUALS">&lt;=</option>
        </select>
        <input
          type="number"
          className="form-control"
          value={this.state.value}
          onChange={this.onChangeValue}
        />
      </div>
    );
  }
}

export default Preptime;
