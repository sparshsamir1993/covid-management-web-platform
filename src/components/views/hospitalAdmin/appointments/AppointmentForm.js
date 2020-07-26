import React, { useEffect, useLayoutEffect } from "react";
import { Field, reduxForm, change } from "redux-form";
import { connect } from "react-redux";
import MaterialTextField from "../../../utilComponents/MaterialTextField";
import MaterialSelect from "../../../utilComponents/MaterialSelect";
import MaterialAutoComplete from "../../../utilComponents/MaterialAutoComplete";
import {
  getUserListForHospital,
  getHospitalAppointments,
} from "../../../../actions";
import { Button, MenuItem } from "@material-ui/core";
import {
  generateAppointmentDates,
  generateAppointmentHours,
} from "../../../../utils";
import _ from "lodash";
const changeFormEmail = (newValue, props) => (dispatch) => {
  let user = props.userList.filter((user) => user.email === newValue)[0];
  let isNewUser = user?.email ? false : true;

  dispatch(change("hAdminAppointmentForm", "email", newValue));
  dispatch(change("hAdminAppointmentForm", "isNewUser", isNewUser));
  if (!isNewUser && user.id) {
    dispatch(change("hAdminAppointmentForm", "name", user.name));
    dispatch(change("hAdminAppointmentForm", "userId", user.id));
  } else {
    dispatch(change("hAdminAppointmentForm", "name", undefined));
  }
};
let AppointmentForm = (props) => {
  const { handleSubmit, onAppointmentSubmit, pristine, submitting } = props;

  useLayoutEffect(() => {
    // for getting user list
    const getUserListFromAPI = async () => {
      await props.getUserListForHospital();
    };
    getUserListFromAPI();
  }, []);

  useLayoutEffect(() => {
    // for getting appointments
    const getHospitalListFromAPI = async () => {
      await props.getHospitalAppointments(props.myHospital.id);
    };
    if (props.myHospital?.id) {
      getHospitalListFromAPI();
    }
  }, [props.myHospital]);

  const checkUserDetails = (newInput) => {
    props.changeFormEmail(newInput, props);
  };

  const renderAppointmentDates = () => {
    const dates = generateAppointmentDates();

    return dates.map((date) => {
      return (
        <option
          key={date.dateValue}
          value={date.dateValue}
          disabled={date.isBooked}
        >
          {date.dateText}
        </option>
      );
    });
  };
  const renderAppointmentHours = () => {
    const slots = generateAppointmentHours();
    let selectedDateAppointments = [];
    let bookedApTimes = [];
    if (props.formValues?.values?.selectedDate) {
      selectedDateAppointments = props.appointmentList.filter((appointment) => {
        let selectedDate = props.formValues?.values?.selectedDate;
        if (selectedDate) {
          let year = new Date().getFullYear();
          let date = selectedDate.split("-")[0];
          let monthNumber = selectedDate.split("-")[1];
          let appointmentDate = new Date(year, monthNumber, date);
          if (
            new Date(appointment.appointmentDate).getDate() ==
            new Date(appointmentDate).getDate()
          ) {
            return true;
          }
        }
      });
      bookedApTimes = selectedDateAppointments.map(
        (appointment) => appointment.appointmentTime.split(":")?.[0]
      );
    }
    const unBookedSlots = slots.map((slot) => {
      if (slot && bookedApTimes.includes(slot.hourValue + "")) {
        slot.isBooked = true;
      }
      return slot;
    });
    return unBookedSlots.map((slot) => {
      if (slot) {
        return (
          <option
            key={slot.hourValue}
            value={slot.hourValue}
            disabled={slot.isBooked}
          >
            {slot.hourText}
          </option>
        );
      }
    });
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onAppointmentSubmit)}>
        <Field
          type="text"
          labelname="email"
          allowNewInput={true}
          autoCompleteOptions={props.userList}
          handleInputChange={checkUserDetails}
          component={MaterialAutoComplete}
          label="email"
          name="email"
        ></Field>
        <Field
          type="text"
          component={MaterialTextField}
          label="Name"
          name="name"
        ></Field>
        <Field
          name="selectedDate"
          label="Choose Date"
          component={MaterialSelect}
          {...{
            initialValue: props.initialValues ? props.initialValues : "",
          }}
        >
          <option value=""></option>
          {renderAppointmentDates()}
        </Field>
        <Field
          name="selectedTime"
          label="Choose Time"
          component={MaterialSelect}
          {...{
            initialValue: props.initialValues ? props.initialValues : "",
          }}
        >
          <option value=""></option>
          {props.formValues?.values?.selectedDate && renderAppointmentHours()}
        </Field>
        <Button
          variant="contained"
          disabled={pristine || submitting}
          color="primary"
          type="submit"
        >
          Book Appointment
        </Button>
      </form>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    userList: state.hospitalUserList,
    initialValues: { isNewUser: false },
    formValues: state.form.hAdminAppointmentForm,
    myHospital: state.hospitalAdmin.myHospital,
    appointmentList: state.hospitalAdmin.appointmentList,
  };
};
AppointmentForm = reduxForm({
  form: "hAdminAppointmentForm",
})(AppointmentForm);
AppointmentForm = connect(mapStateToProps, {
  getUserListForHospital,
  changeFormEmail,
  getHospitalAppointments,
})(AppointmentForm);

export default AppointmentForm;
