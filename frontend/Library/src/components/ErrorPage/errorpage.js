import React, { Component } from "react";

import PageContainer from "../PageContainer/pagecontainer";

import "./errorpage.scss";

class ErrorPage extends Component {
  render() {
    let fullSize = this.props.full_size;

    if (typeof fullSize === "string")
      fullSize =
        fullSize === "true" ? true : fullSize === "false" ? false : fullSize;

    return (
      <PageContainer padding={false}>
        <div className="error-page-container">
          <div className="error-page-cover">
            <table style={tableStyle(fullSize)}>
              <tbody>
                <tr>
                  <td>
                    <h1 className="error-page-main-text">
                      {this.props.error_title}
                      <small> Error {this.props.error_number}</small>{" "}
                    </h1>
                    <p className="error-page-sub-text">
                      {this.props.error_description} [{this.props.file}]
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </PageContainer>
    );
  }
}

const tableStyle = (fullSize) => {
  let style = {
    height: "85vh",
  };

  if (fullSize === true) {
    style.height = "100vh";
  }

  return style;
};

export default ErrorPage;
