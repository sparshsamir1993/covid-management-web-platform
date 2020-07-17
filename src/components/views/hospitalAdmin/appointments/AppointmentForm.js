import React, { useEffect, useLayoutEffect } from "react";
import { Field, reduxForm, change } from "redux-form";
import { connect } from "react-redux";
import MaterialTextField from "../../../utilComponents/MaterialTextField";
import MaterialSelect from "../../../utilComponents/MaterialSelect";
import MaterialAutoComplete from "../../../utilComponents/MaterialAutoComplete";
import { getUserListForHospital } from "../../../../actions/hospitalAdmin/hAdminUserActions";
import { Button, MenuItem } from "@material-ui/core";
import {
  generateAppointmentDates,
  generateAppointmentHours,
} from "../../../../utils";
const changeFormEmail = (newValue, props) => (dispatch) => {
  let user = props.userList.filter((user) => user.email === newValue)[0];
  let isNewUser = user?.email ? false : true;

  dispatch(change("hAdminAppointmentForm", "email", newValue));
  dispatch(change("hAdminAppointmentForm", "isNewUser", isNewUser));
  console.log(user);
  if (!isNewUser && user.id) {
    dispatch(change("hAdminAppointmentForm", "name", user.name));
    dispatch(change("hAdminAppointmentForm", "userId", user.id));
  } else {
    dispatch(change("hAdminAppointmentForm", "name", undefined));
  }
};
let AppointmentForm = (props) => {
  const { handleSubmit, onAppointmentSubmit, pristine, submitting } = props;

  useEffect(() => {
    console.log(props.userList);
  }, [props.userList]);

  useLayoutEffect(() => {
    const getUserListFromAPI = async () => {
      await props.getUserListForHospital();
    };
    getUserListFromAPI();
  }, []);

  const checkUserDetails = (newInput) => {
    console.log("ihi");
    props.changeFormEmail(newInput, props);
  };

  const renderAppointmentDates = () => {
    const dates = generateAppointmentDates();
    return dates.map((date) => {
      return (
        <option key={date.dateValue} value={date.dateValue}>
          {date.dateText}
        </option>
      );
    });
  };
  const renderAppointmentHours = () => {
    const slots = generateAppointmentHours();
    return slots.map((slot) => {
      return (
        <option
          key={slot.hourValue}
          value={slot.hourValue}
          disabled={slot.isBooked}
        >
          {slot.hourText}
        </option>
      );
    });
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onAppointmentSubmit)}>
        <Field
          type="text"
          labelname="email"
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
          {renderAppointmentHours()}
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
  // console.log(state.hospitalUserList);
  return {
    userList: state.hospitalUserList,
    initialValues: { isNewUser: false },
    formValues: state.form.hAdminAppointmentForm,
  };
};
AppointmentForm = reduxForm({
  form: "hAdminAppointmentForm",
})(AppointmentForm);
AppointmentForm = connect(mapStateToProps, {
  getUserListForHospital,
  changeFormEmail,
})(AppointmentForm);

export default AppointmentForm;
