import React, { createElement } from "react";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";

import AlertMessage from "library/src/components/AlertMessage/alertmessage";
import Button from "library/src/components/Button/button";

import Card from "library/src/components/Card/card";
import CardFrame from "library/src/components/Card/card_frame";
import CardHeader from "library/src/components/Card/card_header";
import CardBody from "library/src/components/Card/card_body";
import CardFooter from "library/src/components/Card/card_footer";

import ColorThemesPicker from "library/src/components/ColorTheme/color_themes_picker";
import Datetime from "library/src/components/Datetime/datetime";
import ErrorPage from "library/src/components/ErrorPage/errorpage";
import Highlight from "library/src/components/Highlight/highlight";

import Modal from "library/src/components/Modal/modal";
import ModalButton from "library/src/components/Modal/modalbutton";

import PageContainer from "library/src/components/PageContainer/pagecontainer";

import Login from "library/src/components/Login/login";
import Logout from "library/src/components/Logout/logout";

import UserBadge from "library/src/components/UserData/userbadge";
import UserData from "library/src/components/UserData/userdata";

const getMappings = () => {
  let mappings = { ..._mappings };

  // custom library components
  components.forEach((component) => {
    mappings[component[0].toLowerCase()] = ({ node, ...props }) => {
      if (component[2]) props = component[2](props);
      return createElement(component[1], props);
    };
  });

  // custom headings
  let headings = ["h1", "h2", "h3", "h4", "h5", "h6"];
  headings.forEach((heading) => {
    mappings[heading] = ({ node, ...props }) => {
      if (
        props.id === "table-of-contents" ||
        props.id.startsWith("parameters") ||
        props.id.startsWith("examples")
      ) {
        return createElement(heading, props);
      }

      return (
        <React.Fragment>
          {createElement(heading, props)}
          <hr />
        </React.Fragment>
      );
    };
  });

  return mappings;
};

const _mappings = {
  // toc
  nav: ({ node, ...props }) => (
    <React.Fragment>
      <h2 className="toc-heading">Table of contents</h2>
      <nav {...props} />
    </React.Fragment>
  ),
  ol: ({ node, ...props }) => {
    if (props.className && props.className.includes("toc-level")) {
      delete props.ordered;
      return <ul {...props} />;
    }
    return <ol {...props} />;
  },

  // custom sections
  p: ({ node, ...props }) => (
    <div className="container-fluid p-0 mt-3 md-3" {...props} />
  ),

  // code highlights
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <SyntaxHighlighter
        children={String(children).replace(/\n$/, "")}
        style={okaidia}
        language={match[1]}
        PreTag="div"
        {...props}
      />
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};

const buttonPropsMapping = (props) => {
  if (props.invertedstyle) {
    props.invertedStyle = props.invertedstyle;
    delete props.invertedstyle;
  }

  return props;
};

const authPropsMapping = (props) => {
  if (props.authapi) {
    props.authApi = props.authapi;
    delete props.authapi;
  }

  if (props.tokenname) {
    props.tokenName = props.tokenname;
    delete props.tokenname;
  }

  if (props.loginroute) {
    props.loginRoute = props.loginroute;
    delete props.loginroute;
  }

  if (props.userroute) {
    props.userRoute = props.userroute;
    delete props.userroute;
  }

  return props;
};

const components = [
  ["AlertMessage", AlertMessage],
  ["Button", Button, buttonPropsMapping],
  ["Card", Card],
  ["CardFrame", CardFrame],
  ["CardHeader", CardHeader],
  ["CardBody", CardBody],
  ["CardFooter", CardFooter],
  ["ColorThemesPicker", ColorThemesPicker],
  ["Datetime", Datetime],
  ["ErrorPage", ErrorPage],
  ["Highlight", Highlight],
  ["Modal", Modal],
  ["ModalButton", ModalButton],
  ["PageContainer", PageContainer],
  ["Login", Login, authPropsMapping],
  ["Logout", Logout, authPropsMapping],
  ["UserBadge", UserBadge, authPropsMapping],
  ["UserData", UserData, authPropsMapping],
];

export default getMappings;
