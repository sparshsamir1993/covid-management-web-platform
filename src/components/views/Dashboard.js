import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { logoutUser } from "../../actions";
import { connect } from "react-redux";

// const Dashboard = () => {

// }

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div></div>;
  }
}

export default connect(null, { logoutUser })(Dashboard);
