import React, { Component, createRef } from "react";

import RecipeInfo from "./recipeInfo";

import Button from "library/src/components/Button/button";

import "./nextRecipe.scss";

class NextRecipe extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.recipeId = -1;

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

    // TODO call graphql api to update last_cooked
    console.log(recipeId);

    this.props.history.push("/recipes/" + recipeId);
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
