import React from "react";
import { Container, Typography } from "@material-ui/core";
import AppointmentForm from "./AppointmentForm";
import { connect } from "react-redux";
import { bookUserAppointment } from "../../../../actions/hospitalAdmin/hAdminAppointmentActions";

let AppointmentFormPage = (props) => {
  const createNewAppointment = async () => {
    console.log(props.formValues.values);
    await props.bookUserAppointment(props.formValues.values);
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
AppointmentFormPage = connect(mapStateToProps, { bookUserAppointment })(
  AppointmentFormPage
);

export default AppointmentFormPage;
