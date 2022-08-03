import React, { Component, createRef } from "react";

import AlertMessage from "../AlertMessage/alertmessage";
import Datetime from "../Datetime/datetime";

import CardFrame from "../Card/card_frame";
import Cardheader from "../Card/card_header";
import CardBody from "../Card/card_body";

import AuthService from "../AuthService/authservice";
import Logout from "../Logout/logout";

import "./userdata.scss";

class UserData extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.username = this.props.username;
    this.auth_api = this.props.authApi;
    this.example = this.props.example ? this.props.example : false;

    this.auth = new AuthService(this.auth_api);

    this.alertMessageRef = createRef();

    if (this.example) {
      this.username = "ExampleUser";
      this.state.id = "0";
      this.state.role = "Admin";
      this.state.last_login = "2022-05-13T23:32:26Z";
      this.state.created = "2022-05-07T18:56:41Z";
      this.isLoggedInUser = true;
    }
  }

  state = {
    id: "",
    role: "",
    last_login: "",
    created: "",
  };

  componentDidMount() {
    if (!this.example) {
      this.updateLoggedInUser();
      this.getAccountData();
    }
  }

  componentDidUpdate() {
    if (!this.example) this.updateLoggedInUser();
  }

  updateLoggedInUser = () => {
    this.isLoggedInUser =
      this.username ===
      this.auth.getProfile()[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
      ];
  };

  update = () => {
    if (!this.example) this.getAccountData();
  };

  getAccountData = () => {
    this.setState({ message: { show: "", content: "" } });
    fetch(this.auth_api + "/users/" + this.username, {
      headers: {
        Authorization: "Bearer " + this.auth.getToken(),
      },
    })
      .then((res) => res.json())
      .then(
        (res) => {
          this.setState({
            id: res.id,
            role: res.role,
            last_login: res.last_login,
            created: res.created,
          });
        },
        (err) => {
          this.alertMessageRef.current.alert(
            "Account " +
              this.username +
              " could not be found: '" +
              err.message +
              "'",
            "error"
          );
        }
      );
  };

  render() {
    return (
      <React.Fragment>
        <AlertMessage ref={this.alertMessageRef} />
        <div className="row justify-content-md-center">
          <div className="col-xl-6 col-lg-8 col-sm-12">
            <CardFrame>
              <Cardheader>
                <div style={cardheaderContainerStyle}>
                  <h3 style={cardHeaderTextStyle}>{this.username}</h3>
                  <small>ID {this.state.id}</small>
                  {this.renderLogout()}
                </div>
              </Cardheader>
              <CardBody>
                <div className="container-fluid">
                  <i>Role:</i> {this.state.role}
                </div>
                <div className="container-fluid">
                  <i>Last login:</i> <Datetime value={this.state.last_login} />
                </div>
                <div className="container-fluid">
                  <i>Created:</i> <Datetime value={this.state.created} />
                </div>
              </CardBody>
            </CardFrame>
          </div>
        </div>
      </React.Fragment>
    );
  }

  renderLogout = () => {
    if (this.isLoggedInUser) {
      return (
        <div className="logout-container">
          <Logout authApi={this.auth_api} />
        </div>
      );
    } else {
      return <React.Fragment />;
    }
  };
}

const cardheaderContainerStyle = {
  position: "relative",
  width: "100%",
  height: "100%",
};

const cardHeaderTextStyle = {
  display: "inline-block",
  width: "fit-content",
  margin: "5px",
};

export default UserData;
