import React, { Component } from "react";
import ReactMarkdown from "react-markdown";

import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";

import remarkGfm from "remark-gfm";

import getMappings from "../page/mappings";
import PageContainer from "library/src/components/PageContainer/pagecontainer";

import "../page/page.scss";

class Home extends Component {
  constructor(props) {
    super(props);
    // load markdown file
    fetch(require("../../assets/content/home.md"))
      .then((res) => res.text())
      .then((res) => {
        this.setState({ fileContent: res });
      });
  }

  state = {
    fileContent: null,
  };

  renderFile = () => {
    if (!this.state.fileContent) return <React.Fragment />;

    return (
      <ReactMarkdown
        rehypePlugins={[rehypeRaw, rehypeSlug]}
        remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
        components={getMappings()}
      >
        {this.state.fileContent}
      </ReactMarkdown>
    );
  };

  render() {
    return (
      <PageContainer className="page" fullsize>
        <div style={{ width: "95%", margin: "0 auto" }}>
          <h1>Home</h1>
          <this.renderFile />
        </div>
      </PageContainer>
    );
  }
}

export default Home;
