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

  const changeFormEmail = (newValue) => (dispatch) => {
    dispatch(change("hAdminAppointmentForm", "email", newValue));
  };
  const checkUserDetails = (newInput, dispatch) => {
    console.log(newInput);
    console.log(props.formValues);
    changeFormEmail(newInput);
    // props.change("email", newInput);
  };
  const MyButton = React.forwardRef((props, ref) => (
    <option {...props} ref={ref}>
      {props.children}
    </option>
  ));
  const htmlOption = (props) => {
    return <option>{props.children}</option>;
  };

  const renderAppointmentDates = () => {
    const dates = generateAppointmentDates();
    return dates.map((date) => {
      return (
        <option key={date} value={date}>
          {date}
        </option>
      );
    });
  };
  const renderAppointmentHours = () => {
    const slots = generateAppointmentHours();
    return slots.map((slot) => {
      return (
        <option key={slot.hour} value={slot.hour} disabled={slot.isBooked}>
          {slot.hour}
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
          name="selectedDay"
          component={MaterialSelect}
          {...{
            initialValue: props.initialValues ? props.initialValues : "",
          }}
        >
          <option value=""></option>
          {renderAppointmentDates()}
        </Field>
        <Field
          name="selectedHour"
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
  return {
    userList: state.hospitalUserList,
    formValues: state.form.hAdminAppointmentForm,
  };
};
AppointmentForm = reduxForm({
  form: "hAdminAppointmentForm",
})(AppointmentForm);
AppointmentForm = connect(mapStateToProps, { getUserListForHospital })(
  AppointmentForm
);

export default AppointmentForm;
