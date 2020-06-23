import React from "react";
import { Typography, Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Field, reduxForm, SubmissionError, stopSubmit } from "redux-form";
import { FormField } from "./FormField";
import { connect } from "react-redux";
import { loginUser } from "../../actions";

const LinkBehavior = React.forwardRef((props, ref) => (
  <Link ref={ref} to="/aa" {...props} />
));

let LoginForm = (props) => {
  const submitLogin = async (values, dispatch) => {
    console.log(values);

    let { email, password } = values;

    if (!email || !password) {
      console.log("eroor is iheere");
      throw new SubmissionError({
        _error: "Please make sure email and password is provided",
      });
    }
    dispatch(stopSubmit("loginForm", {}));
    await props.loginUser(values);
  };
  const { error, handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit(submitLogin)}>
      <Typography variant="h4" gutterBottom>
        Log into Hospital Dashboard
      </Typography>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Field
            key="email"
            type="email"
            name="email"
            label="email"
            component={FormField}
          />
        </Grid>
      </Grid>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Field
            key="password"
            type="password"
            name="password"
            label="password"
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
        Log in
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
LoginForm = reduxForm({
  form: "loginForm",
})(LoginForm);
LoginForm = connect(mapStateToProps, { loginUser })(LoginForm);
export default LoginForm;
