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
import { Button, MenuItem, Typography } from "@material-ui/core";
import {
  generateAppointmentDates,
  generateAppointmentHours,
  removeLastCharFromTime,
} from "../../../../utils";
import _ from "lodash";
import { mainStyles } from "../../../../styles/styles";
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
    console.log(props.formValues?.values);
    if (props.formValues?.values?.selectedDate) {
      console.log(props);
      selectedDateAppointments = props.appointmentList.filter((appointment) => {
        let selectedDate = props.formValues?.values?.selectedDate;
        if (selectedDate) {
          let year = new Date().getFullYear();
          let date = selectedDate.split("-")[0];
          let monthNumber = selectedDate.split("-")[1];
          // debugger;
          let appointmentDate = new Date(year, monthNumber, date);
          // debugger;
          let currentApDate = removeLastCharFromTime(
            appointment.appointmentDate
          );
          if (
            new Date(currentApDate).getTime() ==
            new Date(appointmentDate).getTime()
          ) {
            return true;
          }
        }
      });
      console.log(selectedDateAppointments);
      bookedApTimes = selectedDateAppointments.map(
        (appointment) => appointment.appointmentTime.split(":")?.[0]
      );
    }
    const unBookedSlots = slots.map((slot) => {
      // console.log(bookedApTimes);

      if (slot.hourValue < 10) {
        slot.hourValue = "0" + slot.hourValue;
      }
      // console.log(slot.hourValue);
      if (slot && bookedApTimes.includes(slot.hourValue + "")) {
        slot.isBooked = true;
      }
      return slot;
    });
    // debugger;
    console.log(unBookedSlots);
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
  const appStyles = mainStyles();
  return (
    <React.Fragment>
      <Typography variant="h2">Book Appointment</Typography>
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
          {...{
            className: appStyles.mt10,
          }}
        ></Field>
        <div className={appStyles.mt10}>
          <Field
            type="text"
            component={MaterialTextField}
            label="Name"
            name="name"
            {...{
              className: appStyles.mt10,
            }}
          ></Field>
        </div>
        <div className={appStyles.mt10}>
          <Field
            name="selectedDate"
            label="Choose Date"
            component={MaterialSelect}
            {...{
              initialValue: props.initialValues ? props.initialValues : "",
            }}
            className={appStyles.mt10}
          >
            <option value=""></option>
            {renderAppointmentDates()}
          </Field>
        </div>
        <div className={appStyles.mt10}>
          <Field
            name="selectedTime"
            label="Choose Time"
            component={MaterialSelect}
            {...{
              initialValue: props.initialValues ? props.initialValues : "",
            }}
            className={appStyles.mt10}
          >
            <option value=""></option>
            {props.formValues?.values?.selectedDate && renderAppointmentHours()}
          </Field>
        </div>
        <Button
          variant="contained"
          disabled={pristine || submitting}
          color="primary"
          type="submit"
          className={appStyles.primaryButton}
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
