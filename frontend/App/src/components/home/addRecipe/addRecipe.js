import React, { Component, createRef } from "react";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { gql } from "apollo-boost";

import { backend_api, auth_api } from "../../api_urls";
import TinyEditor from "../../editor/tiny_editor";
import AddIngredients from "./addIngredients";
import AddTags from "./addTags";

import Button from "library/src/components/Button/button";
import AuthService from "library/src/components/AuthService/authservice";
import AlertMessage from "library/src/components/AlertMessage/alertmessage";

import "./addRecipe.scss";

class AddRecipe extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.EditorDescription = new TinyEditor({
      handleContentChange: this.changeEditorDescription,
    });

    this.EditorInstructions = new TinyEditor({
      handleContentChange: this.changeEditorInstructions,
    });

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
    this.ingredientsRef = createRef();
    this.tagsRef = createRef();
  }

  recipeState = {
    title: "",
    description: "",
    instructions: "",
    preptime: "",
    people: "",
  };

  state = {
    loading: false,
    ...this.recipeState,
  };

  changeEditorDescription = (content) => {
    this.setState({ description: content });
  };

  changeEditorInstructions = (content) => {
    this.setState({ instructions: content });
  };

  changeTextField = (type, value) => {
    this.setState({ [type]: value });
  };

  changeNumberField = (type, value) => {
    let parsed;
    if (value === "") {
      parsed = "";
    } else {
      parsed = parseInt(value);
    }

    this.setState({ [type]: parsed });
  };

  addRecipe = () => {
    let recipe = { ...this.state };
    delete recipe.loading;

    if (recipe.preptime === "") recipe.preptime = 0;
    if (recipe.people === "") recipe.people = 0;

    recipe.ingredients = this.ingredientsRef.current.getIngredients();
    recipe.tags = this.tagsRef.current.getTags();

    this.setState({ loading: true });

    this.api
      .mutate({
        mutation: gql`
          mutation ($recipe: AddRecipeType!, $token: String!) {
            addRecipe(recipe: $recipe, token: $token) {
              value
            }
          }
        `,
        variables: {
          recipe,
          token: this.authService.getToken(),
        },
      })
      .then((res) => {
        this.alertRef.current.alert(
          "Rezept wurde hinzugefügt!",
          "success",
          3000
        );
        this.setState({ loading: false, ...this.recipeState });
        this.EditorDescription.updateContent(this.recipeState.description);
        this.EditorInstructions.updateContent(this.recipeState.instructions);
        this.ingredientsRef.current.clear();
        this.tagsRef.current.clear();
      })
      .catch((_) => {
        this.alertRef.current.alert(
          "Rezept konnte nicht hinzugefügt werden.",
          "error",
          3000
        );
        this.setState({ loading: false });
      });
  };

  render() {
    return (
      <div className="add-recipe-container">
        <h2>Rezept hinzufügen</h2>
        <div>
          <div className="row mb-3">
            <label htmlFor="title" className="col-sm-2 col-form-label">
              Titel
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="title"
                value={this.state.title}
                onChange={(e) => this.changeTextField("title", e.target.value)}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Beschreibung</label>
            <div className="col-sm-10">{this.EditorDescription.render()}</div>
          </div>
          <div className="row mb-3">
            <label htmlFor="ingredients" className="col-sm-2 col-form-label">
              Zutaten
            </label>
            <div className="col-sm-10">
              <AddIngredients ref={this.ingredientsRef} />
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Zubereitung</label>
            <div className="col-sm-10">{this.EditorInstructions.render()}</div>
          </div>
          <div className="row mb-3">
            <label htmlFor="preptime" className="col-sm-2 col-form-label">
              Zeit (in min.)
            </label>
            <div className="col-sm-10">
              <input
                type="number"
                className="form-control"
                id="preptime"
                value={this.state.preptime}
                onChange={(e) =>
                  this.changeNumberField("preptime", e.target.value)
                }
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="people" className="col-sm-2 col-form-label">
              Personen
            </label>
            <div className="col-sm-10">
              <input
                type="number"
                className="form-control"
                id="people"
                value={this.state.people}
                onChange={(e) =>
                  this.changeNumberField("people", e.target.value)
                }
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="tags" className="col-sm-2 col-form-label">
              Tags
            </label>
            <div className="col-sm-10">
              <AddTags ref={this.tagsRef} />
            </div>
          </div>
          <AlertMessage ref={this.alertRef} />
          {this.state.loading && (
            <div className="recipe-info-loading-container">
              <div className="spinner-grow" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          <div className="add-button-container">
            <Button level="warning" action={this.addRecipe}>
              Hinzufügen
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default AddRecipe;
