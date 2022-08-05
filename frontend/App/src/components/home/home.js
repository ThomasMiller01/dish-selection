import React from "react";

import Page from "../page";
import AddRecipe from "./addRecipe/addRecipe";
import NextRecipe from "./nextRecipe/nextRecipe";

import "./home.scss";

const Home = (props) => {
  return (
    <Page>
      <div className="row justify-content-center">
        <div className="col-sm-12 col-md-8 col-xl-6">
          <NextRecipe history={props.history} />
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-sm-12 col-md-8 col-xl-6">
          <AddRecipe />
        </div>
      </div>
    </Page>
  );
};

export default Home;
