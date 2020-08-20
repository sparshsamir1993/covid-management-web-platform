import React, { useEffect, useState } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import MaterialTextField from "../../../utilComponents/MaterialTextField";
import MaterialSelect from "../../../utilComponents/MaterialSelect";
import * as AppointmentConstants from "../../../../constants/appointmentConstants";
import { Button, Container, Card, makeStyles, Grid } from "@material-ui/core";
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
  }, [props.appointment]);
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
  console.log(props);
  let { appointment } = props;
  console.log(appointment);
  if (appointment) {
    let { appointmentStatus } = props.appointment;
    console.log(appointmentStatus);
    return (
      <Container maxWidth="lg">
        <Card className={classes.appointmentDetailCard}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <h1>{appointmentStatus}</h1>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={8}>
              Update appointment Status
            </Grid>
            <Grid item xs={4}>
              <form onSubmit={handleSubmit(onAppointmentUpdate)}>
                <Field
                  type="text"
                  component={MaterialSelect}
                  label="Appointment Status"
                  name="appointmentStatus"
                  initialValues={{
                    appointmentStatus: appointment.appointmentStatus
                      ? appointment.appointmentStatus
                      : "",
                  }}
                  {...{
                    initialValues: {
                      appointmentStatus: appointment.appointmentStatus
                        ? appointment.appointmentStatus
                        : "",
                    },
                  }}
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
            </Grid>
          </Grid>
        </Card>
      </Container>
    );
  } else {
    // props.history.goBack();
    return <div></div>;
  }
};

const mapStateToProps = (state, props) => {
  console.log(state.hospitalAdmin);
  return {
    appointmentDetail: "",
    formValues: state.form.appointmentDetailForm,
    appointment: state.hospitalAdmin.appointmentList[0] || props.location.state,
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
