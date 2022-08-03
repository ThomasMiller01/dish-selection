import React, { Component } from "react";
import { renderToString } from "react-dom/server";
import ReactMarkdown from "react-markdown";
import Toc from "react-toc";

import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";

import remarkGfm from "remark-gfm";

import { content } from "../../assets/config";
import getMappings from "../page/mappings";
import PageContainer from "library/src/components/PageContainer/pagecontainer";

import "./sidebar.scss";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    // load toc
    this.createToc().then((toc) => {
      // load markdown file
      fetch(require("../../assets/content/sidebar.md"))
        .then((res) => res.text())
        .then((res) => {
          let parsed = res.replace("[[TOC]]", toc);
          this.setState({ fileContent: parsed });
        });
    });
  }

  state = {
    content: null,
    fileContent: null,
  };

  createToc = async () => {
    let items = [];

    for (var item of content) {
      let item_content = await fetch(item.file).then((res) => res.text());
      let item_toc = renderToString(
        <Toc markdownText={item_content} type="raw" lowestHeadingLevel={3} />
      );

      // remove double url
      item_toc = item_toc.replaceAll("<ul><ul>", "<ul>");
      item_toc = item_toc.replaceAll("</ul></ul>", "</ul>");

      // set correct link
      item_toc = item_toc.replaceAll(
        ' href="',
        ' href="' + process.env.PUBLIC_URL + "/" + item.route
      );

      let template = `
        <li>
          <a href="${process.env.PUBLIC_URL + "/" + item.route}">${
        item.title
      }</a>
          ${item_toc}
        </li>
      `;
      items.push(template);
    }
    let toc = `
      <ul>
        ${items.join("\n")}
      </ul>
    `;
    toc = toc.replace(/>\s+</g, "><");
    toc = toc.trim();
    return toc;
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
      <PageContainer className="sidebar" fullsize>
        <div style={{ width: "95%", margin: "0 auto" }}>
          <this.renderFile />
        </div>
      </PageContainer>
    );
  }
}

export default Sidebar;
