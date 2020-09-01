import React from "react";
import { Typography, Button, Grid } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { Field, reduxForm, SubmissionError, stopSubmit } from "redux-form";
import { FormField } from "./FormField";
import { connect } from "react-redux";
import { loginUser, showLoading, hideLoading } from "../../actions";
import { mainStyles } from "../../styles/styles";

const LinkBehavior = React.forwardRef((props, ref) => (
  <Link ref={ref} to="/aa" {...props} />
));

let LoginForm = (props) => {
  let appStyles = mainStyles();
  let history = useHistory();
  const submitLogin = async (values, dispatch) => {
    let { email, password } = values;
    if (!email || !password) {
      throw new SubmissionError({
        _error: "Please make sure email and password is provided",
      });
    }
    dispatch(stopSubmit("loginForm", {}));
    props.showLoading();
    await props.loginUser(values, history);
    props.hideLoading();
  };
  const { error, handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit(submitLogin)}>
      <Typography variant="h4" gutterBottom style={{ fontFamily: "Raleway" }}>
        Sign in
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} className={appStyles.mt25}>
          <Field
            key="email"
            type="email"
            name="email"
            label="email"
            component={FormField}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} className={appStyles.mt25}>
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
      <Button
        className={appStyles.mt25}
        type="submit"
        disabled={submitting}
        variant="outlined"
      >
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
LoginForm = connect(mapStateToProps, { loginUser, showLoading, hideLoading })(
  LoginForm
);
export default LoginForm;
