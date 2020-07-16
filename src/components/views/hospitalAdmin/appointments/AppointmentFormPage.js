import React from "react";
import { Container, Typography } from "@material-ui/core";
import AppointmentForm from "./AppointmentForm";
import { connect } from "react-redux";

let AppointmentFormPage = (props) => {
  const createNewAppointment = () => {
    console.log(props.formValues);
  };
  return (
    <Container maxWidth="lg">
      <AppointmentForm onAppointmentSubmit={createNewAppointment} />
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    formValues: state.form.hAdminAppointmentForm,
  };
};
AppointmentFormPage = connect(mapStateToProps)(AppointmentFormPage);

export default AppointmentFormPage;
