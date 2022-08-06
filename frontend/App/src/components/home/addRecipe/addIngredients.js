import React, { Component } from "react";

import Button from "library/src/components/Button/button";

class AddIngredients extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.ingredients_id = 0;
  }

  state = {
    ingredients: [],
    input: "",
  };

  getIngredients = () => {
    let ingredients = JSON.parse(JSON.stringify(this.state.ingredients));
    ingredients.forEach((ingredient) => {
      delete ingredient.id;
    });
    return ingredients;
  };

  addIngredient = () => {
    if (this.state.input === "") return;

    let ingredients = this.state.ingredients;
    ingredients.push({
      id: this.ingredients_id++,
      name: this.state.input,
      amount: "",
      unit: "GRAM",
      comment: "",
    });

    this.setState({ input: "" });
  };

  removeIngredient = (id) => {
    let ingredients = this.state.ingredients;
    let index = ingredients.findIndex((i) => i.id === id);
    ingredients.splice(index, 1);
    this.setState({ ingredients });
  };

  clear = () => {
    this.setState({ ingredients: [], input: "" });
  };

  inputKeyPress = (e) => {
    if (e.key === "Enter") {
      this.addIngredient();
    }
  };

  inputChange = (e) => {
    this.setState({ input: e.target.value });
  };

  changeTextField = (id, type, value) => {
    let ingredients = this.state.ingredients;
    ingredients.find((i) => i.id === id)[type] = value;
    this.setState({ ingredients });
  };

  render() {
    return (
      <div className="add-multiple-container">
        <div className="col-sm-12 col-md-8 col-xl-6">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              onKeyDown={this.inputKeyPress}
              value={this.state.input}
              onChange={this.inputChange}
            />
            <button className="btn" type="button" onClick={this.addIngredient}>
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
        <div>
          {this.state.ingredients.map((ingredient) => (
            <div className="row multiple-container" key={ingredient.id}>
              <div className=" col-sm-12 col-lg-11">
                <div className="input-group">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Name"
                      value={ingredient.name}
                      onChange={(e) =>
                        this.changeTextField(
                          ingredient.id,
                          "name",
                          e.target.value
                        )
                      }
                    />
                    <label htmlFor="name">Name</label>
                  </div>
                  <div className="form-floating amount-input">
                    <input
                      type="text"
                      className="form-control"
                      id="amount"
                      placeholder="Menge"
                      value={ingredient.amount}
                      onChange={(e) =>
                        this.changeTextField(
                          ingredient.id,
                          "amount",
                          e.target.value
                        )
                      }
                    />
                    <label htmlFor="amount">Menge</label>
                  </div>
                  <select
                    className="form-select"
                    value={ingredient.unit}
                    onChange={(e) =>
                      this.changeTextField(
                        ingredient.id,
                        "unit",
                        e.target.value
                      )
                    }
                  >
                    {Object.keys(unitEnum).map((unit, index) => (
                      <option value={unit} key={index}>
                        {unitEnum[unit]}
                      </option>
                    ))}
                  </select>
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="comment"
                      placeholder="Kommentar"
                      value={ingredient.comment}
                      onChange={(e) =>
                        this.changeTextField(
                          ingredient.id,
                          "comment",
                          e.target.value
                        )
                      }
                    />
                    <label htmlFor="comment">Kommentar</label>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-lg-1">
                <Button action={() => this.removeIngredient(ingredient.id)}>
                  <i className="fa-solid fa-x"></i>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const unitEnum = {
  GRAM: "g",
  KILOGRAMS: "kg",
  MILLI_LITER: "ml",
  LITER: "l",
  TABLE_SPOON: "EL",
  TEA_SPOON: "TL",
  PIECES: "Stück",
  A_BIT: "etwas",
};

export default AddIngredients;
