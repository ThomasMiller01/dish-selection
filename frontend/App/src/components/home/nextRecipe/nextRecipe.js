import React, { Component, createRef } from "react";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { gql } from "apollo-boost";

import { backend_api, auth_api } from "../../api_urls";
import RecipeInfo from "./recipeInfo";

import AuthService from "library/src/components/AuthService/authservice";
import Button from "library/src/components/Button/button";

import "./nextRecipe.scss";

class NextRecipe extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.authService = new AuthService(auth_api, "recipe-selection-token");

    this.api = new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({
        uri: backend_api,
      }),
      defaultOptions: {
        watchQuery: { fetchPolicy: "no-cache" },
        query: { fetchPolicy: "no-cache" },
      },
    });

    this.recipeInfoRef = createRef();
  }

  componentDidMount() {
    this.getRecipe();
  }

  getRecipe = () => {
    this.recipeInfoRef.current.getRecipe();
  };

  cookRecipe = () => {
    let recipeId = this.recipeInfoRef.current.getRecipeId();

    this.api
      .mutate({
        mutation: gql`
          mutation ($recipe_id: Int!, $token: String!) {
            cookRecipe(recipe_id: $recipe_id, token: $token) {
              value
            }
          }
        `,
        variables: {
          recipe_id: recipeId,
          token: this.authService.getToken(),
        },
      })
      .then((_) => {
        this.props.history.push("/recipes/" + recipeId);
      });
  };

  render() {
    return (
      <div className="next-recipe-container">
        <RecipeInfo ref={this.recipeInfoRef} />
        <div className="action-buttons">
          <Button action={this.cookRecipe}>Kochen</Button>
          <Button level="warning" action={this.getRecipe}>
            Anderes Rezept
          </Button>
        </div>
      </div>
    );
  }
}

export default NextRecipe;
