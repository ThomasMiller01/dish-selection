import React, { Component } from "react";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { gql } from "apollo-boost";

import { backend_api, auth_api } from "../api_urls";
import Page from "../page";

import AuthService from "library/src/components/AuthService/authservice";

import CardFrame from "library/src/components/Card/card_frame";
import Cardheader from "library/src/components/Card/card_header";
import CardBody from "library/src/components/Card/card_body";
import CardFooter from "library/src/components/Card/card_footer";

class Recipes extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.authService = new AuthService(auth_api, "recipe-selection-token");

    this.api = new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({
        uri: backend_api,
      }),
    });
  }

  state = {
    recipes: [],
  };

  componentDidMount() {
    this.getRecipes();
  }

  getRecipes = () => {
    this.api
      .query({
        query: gql`
          query ($token: String!) {
            recipes(token: $token) {
              id
              title
              description
              preptime
              last_cooked
              created
              tags {
                id
                value
              }
            }
          }
        `,
        variables: { token: this.authService.getToken() },
      })
      .then((res) => {
        console.log(res);
        this.setState({ recipes: res.data.recipes });
      });
  };

  render() {
    return (
      <Page>
        <div className="row">
          {this.state.recipes.map((recipe, index) => (
            <div className="col" key={index}>
              <a href={"/recipes/" + recipe.id}>
                <CardFrame>
                  <Cardheader>
                    <h4>{recipe.title}</h4> <small>ID: {recipe.id}</small>
                  </Cardheader>
                  <CardBody>{recipe.description}</CardBody>
                  <CardFooter>Zubereitet: {recipe.last_cooked}</CardFooter>
                </CardFrame>
              </a>
            </div>
          ))}
        </div>
      </Page>
    );
  }
}

export default Recipes;
