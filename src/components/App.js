import React, { Component } from "react";
import RecatDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";

import Header from "./Header";
import Home from "./views/Home";

import "../styles/main.scss";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import theme from "../styles/theme";
class App extends Component {
  render() {
    return (
      <div className="app-background">
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <Header />
          </BrowserRouter>
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
