import React, { Component } from "react";

import Datetime from "library/src/components/Datetime/datetime";

import "./footer.scss";

class Footer extends Component {
  render() {
    return (
      <footer className="footer-container">
        <div
          className="text-center py-3 divFooterStyle"
          style={divFooterLeftSideStyle}
        >
          <div style={div1Style}>
            Copyright &copy; <Datetime value="02.08.2022" format="year" />,
            Thomas Miller
          </div>
        </div>
      </footer>
    );
  }
}

// Styles
const div1Style = {
  margin: "0 auto",
};

const divFooterLeftSideStyle = {
  display: "flex",
  justifyContent: "space-between",
};

export default Footer;
