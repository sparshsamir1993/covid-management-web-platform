import React from "react";
import Home from "../views/Home";

const { BrowserRouter, Route, Switch } = require("react-router-dom");
const { default: Header } = require("./Header");
const RouterSwitch = () => {
  return (
    <div className="container">
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  );
};
export default RouterSwitch;
