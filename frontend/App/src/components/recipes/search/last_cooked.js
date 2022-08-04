import React, { Component } from "react";

class LastCooked extends Component {
  state = {
    value: "",
    comparator: "AT",
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
        <label className="input-group-text">Zubereitet</label>
        <select
          className="form-select"
          value={this.state.comparator}
          onChange={this.onChangeComparator}
        >
          <option value="AT">am</option>
          <option value="BEFORE">vor dem</option>
          <option value="AFTER">nach dem</option>
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

export default LastCooked;
