import React from "react";
import Home from "./views/Home";
import { connect } from "react-redux";
import Dashboard from "./views/Dashboard";
import { checkAndUpdateTokens } from "../utils";
import { getUser, showLoading, hideLoading } from "../actions";
import UserList from "./views/admin/user/UserList";
import UserEdit from "./views/admin/user/UserEdit";
import QuestionList from "./views/admin/question/QuestionList";
import QuestionFormPage from "./views/admin/question/QuestionFormPage";
import HospitalList from "./views/admin/hospital/HospitalList";
import HospitalFormPage from "./views/admin/hospital/HospitalFormPage";
import AppointmentFormPage from "./views/hospitalAdmin/appointments/AppointmentFormPage";
import AppointmentListPage from "./views/hospitalAdmin/appointments/AppointmentListPage";
import AppointmentDetailPage from "./views/hospitalAdmin/appointments/AppointmentDetailPage";

const { BrowserRouter, Route, Switch } = require("react-router-dom");
const { default: Header } = require("./Header");
const RouterSwitch = (props) => {
  return (
    <div className="container">
      <Switch>
        <Route exact path="/" component={props.auth.id ? Dashboard : Home} />
        <Route exact path="/admin/users" component={UserList} />
        <Route exact path="/admin/users/edit" component={UserEdit} />

        <Route exact path="/admin/questions" component={QuestionList} />
        <Route exact path="/admin/questions/new" component={QuestionFormPage} />
        <Route
          exact
          path="/admin/questions/edit"
          component={QuestionFormPage}
        />
        <Route exact path="/admin/hospitals" component={HospitalList} />
        <Route exact path="/admin/hospitals/new" component={HospitalFormPage} />
        <Route
          exact
          path="/admin/hospitals/edit"
          component={HospitalFormPage}
        />
        <Route
          exact
          path="/hospital/appointment/booking"
          component={AppointmentFormPage}
        />
        <Route
          exact
          path="/hospital/appointment/list"
          component={AppointmentListPage}
        />
        <Route
          exact
          path="/hospital/appointment/detail"
          component={AppointmentDetailPage}
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
export default connect(mapStateToProps, { getUser, showLoading, hideLoading })(
  RouterSwitch
);
