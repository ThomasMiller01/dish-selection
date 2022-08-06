import React, { Component, createRef } from "react";

import CardBody from "library/src/components/Card/card_body";
import CardFrame from "library/src/components/Card/card_frame";

import Keywords from "./keywords";
import Preptime from "./preptime";
import People from "./people";
import LastCooked from "./last_cooked";
import Tags from "./tags";
import Ingredients from "./ingredients";

import "./search.scss";

class SearchFilter extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.load = this.props.load;

    this.keywordsRef = createRef();
    this.preptimeRef = createRef();
    this.peopleRef = createRef();
    this.lastCookedRef = createRef();
    this.ingredientsRef = createRef();
    this.tagsRef = createRef();
  }

  getSearch = () => {
    let keywords = this.keywordsRef.current.getState().keywords;
    let preptime = this.preptimeRef.current.getState();
    let people = this.peopleRef.current.getState();
    let lastCooked = this.lastCookedRef.current.getState();
    let ingredients = this.ingredientsRef.current.getState().ingredients;
    let tags = this.tagsRef.current.getState().tags;

    let search = {};

    if (keywords !== "") search.keywords = keywords;
    if (preptime.value !== -1) search.preptime = preptime;
    if (people.value !== -1) search.people = people;
    if (lastCooked.value !== -1) search.last_cooked = lastCooked;
    if (ingredients.length !== 0) search.ingredients = ingredients;
    if (tags.length !== 0) search.tags = tags;

    return search;
  };

  search = () => {
    let search = this.getSearch();
    this.load(search);
  };

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-sm-12 col-md-11 col-lg-9 col-xl-8 search-controls-container">
          <CardFrame>
            <CardBody>
              <div className="row justify-content-end">
                <div className="col-sm-12 col-lg-8 col-xl-6 col-xxl-4 justify-content-center">
                  <Keywords search={this.search} ref={this.keywordsRef} />
                </div>
                <div className="col-sm-12 col-lg-4 col-xl-4 col-xxl-4">
                  <button
                    className="btn filter-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#search-filter"
                  >
                    <i className="fa-solid fa-sliders"></i>
                  </button>
                </div>
                <div
                  className="collapse"
                  id="search-filter"
                  style={{ width: "100%" }}
                >
                  <div className="row">
                    <div className="col-sm-12 col-md-6 col-xxl-4">
                      <Preptime ref={this.preptimeRef} />
                    </div>
                    <div className="col-sm-12 col-md-6 col-xxl-4">
                      <People ref={this.peopleRef} />
                    </div>
                    <div className="col-sm-12 col-md-6 col-xxl-4">
                      <LastCooked ref={this.lastCookedRef} />
                    </div>
                    <div className="col-sm-12 col-md-6">
                      <Ingredients ref={this.ingredientsRef} />
                    </div>
                    <div className="col-sm-12 col-md-6">
                      <Tags ref={this.tagsRef} />
                    </div>
                  </div>
                </div>
                <div className="col-sm-12">
                  <button className="btn search-button" onClick={this.search}>
                    Search
                  </button>
                </div>
              </div>
            </CardBody>
          </CardFrame>
        </div>
      </div>
    );
  }
}

export default SearchFilter;
