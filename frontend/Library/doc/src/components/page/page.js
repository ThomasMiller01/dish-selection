import React, { Component } from "react";
import ReactMarkdown from "react-markdown";

import rehypeRaw from "rehype-raw";
import rehypeToc from "rehype-toc";
import rehypeSlug from "rehype-slug";

import remarkGfm from "remark-gfm";

import PageContainer from "library/src/components/PageContainer/pagecontainer";

import { content } from "../../assets/config";
import getMappings from "./mappings";

import "./page.scss";

class Page extends Component {
  state = {
    content: null,
    fileContent: null,
  };

  componentDidMount() {
    let route = this.props.match.params.content;
    let _content = content.find((e) => e.route === route);

    if (!_content) {
      this.props.history.replace("/");
      return;
    }

    // load markdown file
    fetch(_content.file)
      .then((res) => res.text())
      .then((res) => this.setState({ fileContent: res }));

    this.setState({ content: _content });
  }

  renderFile = () => {
    if (!this.state.fileContent) return <React.Fragment />;

    return (
      <ReactMarkdown
        rehypePlugins={[
          rehypeRaw,
          [
            rehypeToc,
            {
              customizeTOCItem: this.customTocItem,
              headings: ["h1", "h2", "h3", "h4"],
            },
          ],
          rehypeSlug,
        ]}
        remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
        components={getMappings()}
      >
        {this.state.fileContent}
      </ReactMarkdown>
    );
  };

  render() {
    if (!this.state.content) return <React.Fragment />;

    return (
      <PageContainer className="page" fullsize>
        <div className="container">
          <h1>{this.state.content.title}</h1>
          <this.renderFile />
        </div>
      </PageContainer>
    );
  }

  customTocItem = (toc, heading) => {
    if (
      heading.children[0].type === "element" &&
      heading.children[0].tagName === "a"
    ) {
      toc.children[0].properties.href = heading.children[0].properties.href;
    } else {
      let link = heading.children[0].value;

      link = link.toLowerCase();
      link = link.replaceAll(" ", "-");
      link = link.replaceAll("(", "").replaceAll(")", "");

      toc.children[0].properties.href = "#" + link;
    }

    return toc;
  };

  getTocItemParent = (item) => {};
}

export default Page;
