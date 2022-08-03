import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import Sidebar from "../sidebar/sidebar";

import "./header.scss";

class Header extends Component {
  render() {
    return (
      <header className="header-container">
        <nav className="navbar navbar-expand-lg header-nav-container">
          <div className="container-fluid" style={{ position: "relativ" }}>
            <button
              className="navbar-toggler header-nav-mobile-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbar_public"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-center header-nav-items"
              id="navbar_public"
            >
              <NavLink to="/home" className="nav-link">
                Home
              </NavLink>
              <NavLink to="/recipes" className="nav-link">
                Recipes
              </NavLink>
            </div>
            <button
              className="btn btn-primary"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#sidebar"
            >
              Einstellungen
            </button>
          </div>
        </nav>
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="sidebar">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title">Einstellungen</h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
            ></button>
          </div>
          <div className="offcanvas-body">
            <Sidebar />
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
