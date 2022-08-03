import React from "react";

import Router from "./components/router";

import Sidebar from "./components/structure/sidebar";

import "./App.scss";

const App = () => {
  return (
    <div className="app">
      <div className="row">
        <div className="col-3">
          <Sidebar />
        </div>
        <div className="col-9">
          <Router />
        </div>
      </div>
    </div>
  );
};

export default App;
