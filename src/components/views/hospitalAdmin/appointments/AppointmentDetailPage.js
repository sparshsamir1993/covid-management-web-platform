import React, { useEffect, useState } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import MaterialTextField from "../../../utilComponents/MaterialTextField";
import MaterialSelect from "../../../utilComponents/MaterialSelect";
import * as AppointmentConstants from "../../../../constants/appointmentConstants";
import { getFormattedDateForAppointment, tConvert } from "../../../../utils";
import {
  Button,
  Container,
  Card,
  makeStyles,
  Grid,
  Typography,
  List,
  ListItem,
  Divider,
} from "@material-ui/core";
import { mainStyles } from "../../../../styles/styles";
import {
  updateAppointmentStatus,
  setAppointmentData,
  showLoading,
  hideLoading,
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
  appointmentDetailList: {
    marginTop: "10px",
  },
  updateStatusText: {
    justifyContent: "center",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
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

    props.updateAppointmentStatus(
      {
        appointmentStatus,
        appointmentId: props.appointment.id,
      },
      props.history
    );
  };
  const classes = useStyles();

  let { appointment } = props;

  if (appointment) {
    let {
      appointmentStatus,
      user,
      appointmentDate,
      appointmentTime,
    } = props.appointment;
    let dateToDisplay = getFormattedDateForAppointment(appointmentDate);
    let timeToDisplay = tConvert(appointmentTime);

    return (
      <Container maxWidth="lg">
        <Card className={classes.appointmentDetailCard}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h3">Appointment Details</Typography>
              <Divider className={appStyles.mt25} />

              <List className={classes.appointmentDetailList}>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography variant="h5">User Email</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h5">{user.email}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography variant="h5">Appointment Date</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h5">{dateToDisplay}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography variant="h5">Appointment Time</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h5">{timeToDisplay}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography variant="h5">Appointment Status</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h5">{appointmentStatus}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
              </List>
            </Grid>
          </Grid>
          <Divider />
          <Grid container spacing={3} className={appStyles.mt25}>
            <Grid item xs={8} className={classes.updateStatusText}>
              <Typography variant="h4">Update appointment status</Typography>
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
    props.history.goBack();
    return <div></div>;
  }
};

const mapStateToProps = (state, props) => {
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
  showLoading,
  hideLoading,
})(AppointmentDetailPage);

export default AppointmentDetailPage;
