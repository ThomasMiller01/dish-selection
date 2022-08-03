import React, { Component } from "react";

import CardFrame from "./card_frame";
import Cardheader from "./card_header";
import CardBody from "./card_body";
import CardFooter from "./card_footer";

import "./card.scss";

class Card extends Component {
  render() {
    let title = this.props.title;
    let footer = this.props.footer;
    let children = this.props.children;
    return (
      <CardFrame>
        <Cardheader>
          <h6 className="m-0 font-weight-bold">{title}</h6>
        </Cardheader>
        <CardBody>{children}</CardBody>
        <CardFooter>{footer}</CardFooter>
      </CardFrame>
    );
  }
}

export default Card;
