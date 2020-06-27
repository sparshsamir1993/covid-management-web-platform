import React from "react";
import Home from "../views/Home";
import { connect } from "react-redux";
import Dashboard from "../views/Dashboard";
import { checkAndUpdateTokens } from "../utils";
import { getUser, showLoading, hideLoading } from "../actions";

const { BrowserRouter, Route, Switch } = require("react-router-dom");
const { default: Header } = require("./Header");
const RouterSwitch = (props) => {
  const storedToken = window.sessionStorage.getItem("token");
  const storedRefreshToken = window.sessionStorage.getItem("refreshToken");
  let tokens;
  if (storedToken && storedRefreshToken) {
    tokens = checkAndUpdateTokens(storedToken, storedRefreshToken);
    if (!props.auth.id) {
      props.showLoading();
      props.getUser(tokens);
      props.hideLoading();
    }
  }

  return (
    <div className="container">
      <Switch>
        <Route exact path="/" component={props.auth.id ? Dashboard : Home} />
      </Switch>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps, { getUser, showLoading, hideLoading })(
  RouterSwitch
);
