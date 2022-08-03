import React, { Component } from "react";

import "./alertmessage.css";

class AlertMessage extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  componentDidMount() {
    let visible = this.props.visible;

    if (typeof this.visible === "string")
      visible =
        visible === "true" ? true : visible === "false" ? false : visible;

    if (visible) {
      this.show();
    }

    this.setMessage(this.props.message);
    this.setLevel(this.props.level);
  }

  alert = (message, level = "default", time = 0) => {
    this.setMessage(message);
    this.setLevel(level);
    this.show();

    if (time > 0) {
      setTimeout(() => this.hide(), time);
    }
  };

  show = () => {
    this.setState({ show: true });
  };

  hide = () => {
    this.setState({ show: false });
  };

  setMessage = (message) => {
    this.setState({ content: message });
  };

  setLevel = (level) => {
    let levelClass;
    switch (level) {
      case "default":
      default:
        levelClass = "primary";
        break;

      case "info":
        levelClass = "info";
        break;

      case "success":
        levelClass = "success";
        break;

      case "warning":
        levelClass = "warning";
        break;

      case "error":
        levelClass = "danger";
        break;
    }

    this.setState({ level: levelClass });
  };

  state = {
    show: false,
    content: "",
    level: "",
  };

  render() {
    if (this.state.show) {
      return (
        <div className="alert-message-container">
          <div className={"alert alert-" + this.state.level + " alert-message"}>
            {this.state.content}
          </div>
        </div>
      );
    } else {
      return <React.Fragment />;
    }
  }
}

export default AlertMessage;
