import React, { useEffect, useState } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import MaterialTextField from "../../../utilComponents/MaterialTextField";
import MaterialSelect from "../../../utilComponents/MaterialSelect";
import * as AppointmentConstants from "../../../../constants/appointmentConstants";
import { Button, Container, Card, makeStyles } from "@material-ui/core";
import { mainStyles } from "../../../../styles/styles";
import {
  updateAppointmentStatus,
  setAppointmentData,
} from "../../../../actions";

const useStyles = makeStyles(() => ({
  appointmentDetailCard: {
    padding: "10px",
    marginTop: "150px",
  },
  primaryButton: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
    margin: "100px",
  },
}));
let AppointmentDetailPage = (props) => {
  let appStyles = mainStyles();
  //   console.log(props.formValues?.values?.appointmentStatus);
  const { handleSubmit, pristine, submitting } = props;
  let appointmentData;
  useEffect(() => {
    appointmentData = props?.location?.state;
    console.log(props);
    props.setAppointmentData(appointmentData);
  }, []);
  // let [appointmentStatusState, setAppointmentStatusState] = useState();
  const renderAppointmentStatusTypes = () => {
    const statusTypes = [
      AppointmentConstants.APPOINTMENT_CONFIRMED,
      AppointmentConstants.TEST_RESULT_PENDING,
      AppointmentConstants.TEST_RESULTS_DELIVERED,
    ];

    return statusTypes.map((type) => <option key={type}>{type}</option>);
  };

  const onAppointmentUpdate = () => {
    console.log(props.formValues?.values?.appointmentStatus);
    let { appointmentStatus } = props.formValues?.values;

    props.updateAppointmentStatus({
      appointmentStatus,
      appointmentId: props.appointment.id,
    });
  };
  const classes = useStyles();
  let { appointment } = props;
  console.log(appointment);
  if (appointment) {
    let { appointmentStatus } = props.appointment;
    console.log(appointmentStatus);
    return (
      <Container maxWidth="lg">
        <Card className={classes.appointmentDetailCard}>
          <h1>{appointmentStatus}</h1>
          <br />
          <form onSubmit={handleSubmit(onAppointmentUpdate)}>
            <Field
              type="text"
              component={MaterialSelect}
              label="Appointment Status"
              name="appointmentStatus"
            >
              <option value=""></option>
              {renderAppointmentStatusTypes()}
            </Field>
            <Button
              variant="contained"
              disabled={pristine || submitting}
              className={appStyles.primaryButton}
              type="submit"
            >
              Change Status
            </Button>
          </form>
        </Card>
      </Container>
    );
  } else {
    return <div></div>;
  }
};

const mapStateToProps = (state) => {
  console.log(state.hospitalAdmin);
  return {
    appointmentDetail: "",
    formValues: state.form.appointmentDetailForm,
    appointment: state.hospitalAdmin.appointmentList[0],
  };
};

AppointmentDetailPage = reduxForm({
  form: "appointmentDetailForm",
})(AppointmentDetailPage);

AppointmentDetailPage = connect(mapStateToProps, {
  updateAppointmentStatus,
  setAppointmentData,
})(AppointmentDetailPage);

export default AppointmentDetailPage;
