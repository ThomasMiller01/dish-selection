import React, { Component } from "react";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { gql } from "apollo-boost";

import { backend_api, auth_api } from "../api_urls";
import Page from "../page";

import AuthService from "library/src/components/AuthService/authservice";

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state.id = this.props.match.params.recipe;

    this.authService = new AuthService(auth_api, "recipe-selection-token");

    this.api = new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({
        uri: backend_api,
      }),
    });
  }

  componentDidMount() {
    this.getRecipe();
  }

  state = {
    loading: true,
    error: "",
    id: -1,
    title: "",
    description: "",
    instructions: "",
    ingredients: [],
    preptime: 0,
    last_cooked: "",
    created: "",
    tags: [],
  };

  getRecipe = () => {
    if (this.state.id !== -1) {
      this.api
        .query({
          query: gql`
            query ($recipe_id: Int!, $token: String!) {
              recipe(recipe_id: $recipe_id, token: $token) {
                title
                description
                instructions
                ingredients {
                  id
                  name
                  amount
                  unit
                  comment
                }
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
          variables: {
            recipe_id: this.state.id,
            token: this.authService.getToken(),
          },
        })
        .then((res) => {
          console.log(res);
          this.setState({ ...res.data.recipe, loading: false });
        })
        .catch((err) => {
          console.log(err);
          this.setState({ loading: false, error: err });
        });
    }
  };

  render() {
    return (
      <Page>
        <this.renderRecipe />
      </Page>
    );
  }

  renderRecipe = () => {
    if (this.state.loading) return <span>Loading ...</span>;
    if (this.state.error !== "")
      return <span>Could not load recipe: {this.state.error.toString()}</span>;

    return (
      <React.Fragment>
        <h1>Recipe</h1>
        <p>{this.state.id}</p>
        <p>{this.state.title}</p>
        <p>{this.state.description}</p>
        <p>{this.state.instructions}</p>
        <p>
          <ul>
            {this.state.ingredients.map((ingredient, index) => (
              <li key={index}>
                {ingredient.id}, {ingredient.name}, {ingredient.amount}{" "}
                {ingredient.unit}, {ingredient.comment}
              </li>
            ))}
          </ul>
        </p>
        <p>{this.state.preptime}</p>
        <p>
          <ul>
            {this.state.tags.map((tag, index) => (
              <li key={index}>
                {tag.id}, {tag.value}
              </li>
            ))}
          </ul>
        </p>
        <p>{this.state.last_cooked}</p>
        <p>{this.state.created}</p>
      </React.Fragment>
    );
  };
}

export default Recipe;
