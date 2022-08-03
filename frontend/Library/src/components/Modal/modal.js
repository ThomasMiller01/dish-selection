import React, { Component } from "react";

import "./modal.scss";

class Modal extends Component {
  render() {
    let id = this.props.id;
    let title = this.props.title;
    let children = this.props.children;
    let button = this.props.button;
    let action = this.props.action;
    if (typeof action === "string") action = new Function(action);

    let show_dialog = this.props.show_dialog;
    if (typeof show_dialog === "string")
      show_dialog =
        show_dialog === "true"
          ? true
          : show_dialog === "false"
          ? false
          : show_dialog;

    if (show_dialog) {
      return this.renderDialog(title, children, button, action, false);
    }

    return (
      <div className="modal fade" id={id + "_modal"} tabIndex="-1">
        {this.renderDialog(title, children, button, action, true)}
      </div>
    );
  }

  renderDialog = (title, children, button, action, show_dialog) => {
    return (
      <div className="modal-dialog">
        <div className="modal-content modal-container">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn modal-button-close"
              data-bs-dismiss="modal"
            >
              <i className="fa-solid fa-x"></i>
            </button>
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss={show_dialog === true ? "modal" : ""}
              onClick={action}
            >
              {button}
            </button>
            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss={show_dialog === true ? "modal" : ""}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };
}

export default Modal;
