import React from "react";
import { Container, Typography } from "@material-ui/core";
import AppointmentForm from "./AppointmentForm";
import { connect } from "react-redux";
import { bookUserAppointment } from "../../../../actions/hospitalAdmin/hAdminAppointmentActions";
import { mainStyles } from "../../../../styles/styles";

let AppointmentFormPage = (props) => {
  const createNewAppointment = async () => {
    await props.bookUserAppointment(
      {
        ...props.formValues.values,
        hospitalId: props.adminHospital.id,
      },
      props.history
    );
  };
  const appStyles = mainStyles();
  return (
    <Container maxWidth="lg">
      <div className={appStyles.mt100}>
        <AppointmentForm onAppointmentSubmit={createNewAppointment} />
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    formValues: state.form.hAdminAppointmentForm,
    adminHospital: state.hospitalAdmin.myHospital,
  };
};
AppointmentFormPage = connect(mapStateToProps, { bookUserAppointment })(
  AppointmentFormPage
);

export default AppointmentFormPage;
