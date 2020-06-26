import React from "react";
import Home from "../views/Home";
import { connect } from "react-redux";
import Dashboard from "../views/Dashboard";
import { checkAndUpdateTokens } from "../utils";

const { BrowserRouter, Route, Switch } = require("react-router-dom");
const { default: Header } = require("./Header");
const RouterSwitch = (props) => {
  const storedToken = window.sessionStorage.getItem("token");
  const storedRefreshToken = window.sessionStorage.getItem("refreshToken");
  let tokens;
  if (storedToken && storedRefreshToken) {
    tokens = checkAndUpdateTokens(storedToken, storedRefreshToken);
  }

  return (
    <div className="container">
      <Switch>
        <Route
          exact
          path="/"
          component={
            props.auth.id || (tokens && tokens.token) ? Dashboard : Home
          }
        />
      </Switch>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps)(RouterSwitch);
