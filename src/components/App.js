import React, { Component } from "react";
import RecatDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import Header from "./Header";

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
