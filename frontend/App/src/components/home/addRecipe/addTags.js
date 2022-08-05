import React, { Component } from "react";

import Button from "library/src/components/Button/button";

class AddTags extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.tags_id = 0;
  }

  state = {
    tags: [],
    input: "",
  };

  getTags = () => {
    let tags = JSON.parse(JSON.stringify(this.state.tags));
    tags.forEach((tag) => {
      delete tag.id;
    });
    return tags;
  };

  addTag = () => {
    if (this.state.input === "") return;

    let tags = this.state.tags;
    tags.push({
      id: this.tags_id++,
      value: this.state.input,
    });

    this.setState({ input: "" });
  };

  removeTag = (id) => {
    let tags = this.state.tags;
    let index = tags.findIndex((i) => i.id === id);
    tags.splice(index, 1);
    this.setState({ tags });
  };

  clear = () => {
    this.setState({ tags: [], input: "" });
  };

  inputKeyPress = (e) => {
    if (e.key === "Enter") {
      this.addTag();
    }
  };

  inputChange = (e) => {
    this.setState({ input: e.target.value });
  };

  changeTextField = (id, type, value) => {
    let tags = this.state.tags;
    tags.find((i) => i.id === id)[type] = value;
    this.setState({ tags });
  };

  render() {
    return (
      <div className="add-multiple-container">
        <div className="col-sm-12 col-md-8 col-xl-6">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              onKeyDown={this.inputKeyPress}
              value={this.state.input}
              onChange={this.inputChange}
            />
            <button className="btn" type="button" onClick={this.addTag}>
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
        <div>
          {this.state.tags.map((tag) => (
            <div className="row multiple-container" key={tag.id}>
              <div className=" col-sm-12 col-lg-11">
                <div className="input-group">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="value"
                      placeholder="Value"
                      value={tag.value}
                      onChange={(e) =>
                        this.changeTextField(tag.id, "value", e.target.value)
                      }
                    />
                    <label htmlFor="value">Value</label>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-lg-1">
                <Button action={() => this.removeTag(tag.id)}>
                  <i className="fa-solid fa-x"></i>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default AddTags;
