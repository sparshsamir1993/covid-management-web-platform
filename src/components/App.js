import React, { Component } from "react";
import RecatDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";

import Header from "./Header";
import Home from "../views/Home";

// import "materialize-css";
// import "materialize-css/dist/css/materialize.min.css";
import "../styles/main.scss";
class App extends Component {
  render() {
    return (
      <div className="app-background">
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
