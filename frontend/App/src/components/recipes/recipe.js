import React, { Component, createRef } from "react";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { gql } from "apollo-boost";

import { backend_api, auth_api } from "../api_urls";
import Page from "../page";

import AuthService from "library/src/components/AuthService/authservice";
import AlertMessage from "library/src/components/AlertMessage/alertmessage";
import Datetime from "library/src/components/Datetime/datetime";

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

    this.alertRef = createRef();
  }

  componentDidMount() {
    this.getRecipe();
  }

  state = {
    loading: true,
    error: false,
    id: -1,
    title: "",
    description: "",
    instructions: "",
    ingredients: [],
    preptime: 0,
    people: 0,
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
                people
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
          this.setState({ ...res.data.recipe, loading: false });
        })
        .catch((_) => {
          this.alertRef.current.alert("Could not load recipe ...", "error");
          this.setState({ loading: false, error: true });
        });
    }
  };

  render() {
    return (
      <Page>
        <AlertMessage ref={this.alertRef} />
        <this.renderRecipe />
      </Page>
    );
  }

  renderRecipe = () => {
    if (this.state.loading) {
      return (
        <div className="recipe-loading-container">
          <div className="spinner-grow" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    }

    if (this.state.error) return <React.Fragment />;

    return (
      <div className="recipe-container">
        <div className="header">
          <h1>{this.state.title}</h1>
        </div>
        <div className="metadata">
          <span className="badge">{this.state.preptime} min.</span>
          <span className="badge">{this.state.people} Personen</span>
          <span className="badge">
            Zubereitet <Datetime value={this.state.last_cooked} format="date" />
          </span>
          <span className="badge">
            Seit <Datetime value={this.state.created} format="date" />
          </span>
          <p className="tags-container">
            {this.state.tags.map((tag, index) => (
              <span className="badge rounded-pill" key={index}>
                {tag.value}
              </span>
            ))}
          </p>
        </div>
        <div className="ingredients-container">
          <h3>
            Zutaten: <small>für {this.state.people} Personen</small>
          </h3>
          <table>
            <tbody>
              {this.state.ingredients.map((ingredient, index) => (
                <tr key={index}>
                  <td>
                    {ingredient.amount === 0 ? "" : ingredient.amount}{" "}
                    {ingredient.unit}
                  </td>
                  <td>{ingredient.name}</td>
                  <td>{ingredient.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="instructions-container">
          <h3>
            Zubereitung: <small>{this.state.preptime} min.</small>
          </h3>
          <p dangerouslySetInnerHTML={{ __html: this.state.instructions }} />
        </div>
        <div className="description-container">
          <h3>Beschreibung:</h3>
          <p dangerouslySetInnerHTML={{ __html: this.state.description }} />
        </div>
      </div>
    );
  };
}

export default Recipe;
