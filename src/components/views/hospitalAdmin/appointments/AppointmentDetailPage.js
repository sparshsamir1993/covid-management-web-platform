import React, { useEffect, useState } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import MaterialTextField from "../../../utilComponents/MaterialTextField";
import MaterialSelect from "../../../utilComponents/MaterialSelect";
import * as AppointmentConstants from "../../../../constants/appointmentConstants";
import { Button } from "@material-ui/core";
import {
  updateAppointmentStatus,
  setAppointmentData,
} from "../../../../actions";
let AppointmentDetailPage = (props) => {
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

  let { appointment } = props;
  console.log(appointment);
  if (appointment) {
    let { appointmentStatus } = props.appointment;
    console.log(appointmentStatus);
    return (
      <div>
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
            color="primary"
            type="submit"
          >
            Change Status
          </Button>
        </form>
      </div>
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
