import React, { Component, createRef } from "react";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { gql } from "apollo-boost";

import { backend_api, auth_api } from "../../api_urls";

import AuthService from "library/src/components/AuthService/authservice";
import AlertMessage from "library/src/components/AlertMessage/alertmessage";
import Datetime from "library/src/components/Datetime/datetime";

class RecipeInfo extends Component {
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

    this.alertRef = createRef();
  }

  state = {
    loading: false,
    error: true,
    id: -1,
    title: "",
    description: "",
    ingredients: [],
    preptime: 0,
    people: 0,
    last_cooked: "",
    tags: [],
  };

  getRecipeId = () => {
    return this.state.id;
  };

  getRecipe = () => {
    this.setState({ loading: true });
    this.api
      .query({
        query: gql`
          query ($token: String!) {
            next(token: $token) {
              id
              title
              description
              ingredients {
                id
                name
                amount
                unit
              }
              preptime
              people
              last_cooked
              tags {
                id
                value
              }
            }
          }
        `,
        variables: {
          token: this.authService.getToken(),
        },
      })
      .then((res) => {
        this.setState({ ...res.data.next, loading: false, error: false });
      })
      .catch((_) => {
        this.alertRef.current.alert("Could not load recipe ...", "error", 3000);
        this.setState({ loading: false, error: true });
      });
  };

  render() {
    return (
      <div>
        <AlertMessage ref={this.alertRef} />
        <this.renderRecipe />
      </div>
    );
  }

  renderRecipe = () => {
    if (this.state.loading) {
      return (
        <div className="recipe-info-loading-container">
          <div className="spinner-grow" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    }

    if (this.state.error) return <React.Fragment />;

    return (
      <div className="recipe-info-container">
        <div className="header">
          <h1>
            {this.state.title} <small>{this.state.preptime} min.</small>
          </h1>
        </div>
        <div className="metadata">
          <span className="badge">{this.state.preptime} min.</span>
          <span className="badge">{this.state.people} Personen</span>
          <span className="badge">
            Zubereitet <Datetime value={this.state.last_cooked} format="date" />
          </span>
          <p className="tags-container">
            {this.state.tags.map((tag, index) => (
              <span className="badge rounded-pill" key={index}>
                {tag.value}
              </span>
            ))}
          </p>
        </div>
        <div className="row justify-content-center">
          <div className="col-sm-12 col-xl-6">
            <h3>
              Zutaten: <small>für {this.state.people} Personen</small>
            </h3>
            <table>
              <tbody>
                {this.state.ingredients.map((ingredient, index) => (
                  <tr key={index}>
                    <td>
                      {ingredient.amount} {ingredient.unit}
                    </td>
                    <td>{ingredient.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-sm-12 col-xl-6">
            <h3>Beschreibung:</h3>
            <p dangerouslySetInnerHTML={{ __html: this.state.description }} />
          </div>
        </div>
      </div>
    );
  };
}

export default RecipeInfo;
