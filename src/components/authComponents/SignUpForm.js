import React from "react";
import { Typography, Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Field, reduxForm, SubmissionError, stopSubmit } from "redux-form";
import { FormField } from "./FormField";
import { connect } from "react-redux";
import { registerUser, showLoading, hideLoading } from "../../actions";

const LinkBehavior = React.forwardRef((props, ref) => (
  <Link ref={ref} to="/aa" {...props} />
));

let SignUpForm = (props) => {
  const submitLogin = async (values, dispatch) => {
    console.log(values);

    let { email, password, confirmPassword } = values;

    if (!email || !password || !confirmPassword) {
      throw new SubmissionError({
        _error:
          "Please make sure email, password & confirm password is provided",
      });
    }
    if (password !== confirmPassword) {
      throw new SubmissionError({
        _error: "Passwords do not match",
      });
    }
    dispatch(stopSubmit("loginForm", {}));
    props.showLoading();
    await props.registerUser(values);
    props.hideLoading();
  };
  const { error, handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit(submitLogin)}>
      <Typography variant="h4" gutterBottom>
        Sign up with us.
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Field
            key="email"
            type="email"
            name="email"
            label="Email"
            component={FormField}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Field
            key="password"
            type="password"
            name="password"
            label="Password"
            component={FormField}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Field
            key="confirmPassword"
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            component={FormField}
          />
        </Grid>
      </Grid>
      {error && (
        <div>
          <strong>{error}</strong>
        </div>
      )}
      <Button type="submit" disabled={submitting} variant="outlined">
        Register
      </Button>
    </form>
  );
};

const mapStateToProps = (state) => {
  const formValues = state.form;
  return {
    formValues,
  };
};
SignUpForm = reduxForm({
  form: "signUpForm",
})(SignUpForm);
SignUpForm = connect(mapStateToProps, {
  registerUser,
  showLoading,
  hideLoading,
})(SignUpForm);
export default SignUpForm;
