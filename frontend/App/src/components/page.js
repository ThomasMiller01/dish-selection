import React, { Component } from "react";

import Header from "./header/header";

import PageContainer from "library/src/components/PageContainer/pagecontainer";
import Footer from "./footer/footer";

class Page extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <PageContainer>{this.props.children}</PageContainer>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Page;
