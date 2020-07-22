import React from "react";
import {
  Container,
  Grid,
  Typography,
  makeStyles,
  Divider,
  IconButton,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { useHistory } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import RoleSelect from "../../../adminComponents/RoleSelect";
import {
  USER_ROLE,
  ADMIN_ROLE,
  HOSPITAL_ADMIN_ROLE,
} from "../../../../constants";
import { updateUserRole, showLoading, hideLoading } from "../../../../actions";
import { connect } from "react-redux";

const useStyles = makeStyles(() => ({
  itemStyle: {
    textAlign: "center",
  },
}));
const validate = (values) => {
  const errors = {};
  if (!values["role"]) {
    errors["role"] = "Required";
  }
  console.log(errors);
  return errors;
};

let UserEdit = (props) => {
  const history = useHistory();
  const classes = useStyles();
  if (!props.location.state.email) {
    history.goBack();
  }
  const changeUserRole = async (values, dispatch) => {
    console.log(values);
    let data = {
      role: values.role,
      id: props.location.state.id,
    };
    props.showLoading();
    await props.updateUserRole(data, props.history);
    props.hideLoading();
    props.history.goBack();
  };

  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <Container maxWidth="lg">
      <form onSubmit={handleSubmit(changeUserRole)}>
        <Grid container spacing={4}>
          <Grid item xs={6} className={classes.itemStyle}>
            <Typography variant="h5">Email</Typography>
          </Grid>
          <Grid item xs={6} className={classes.itemStyle}>
            <Typography variant="h5">{props.location.state.email}</Typography>
          </Grid>
        </Grid>
        <Divider />
        <Grid container spacing={4}>
          <Grid item xs={6} className={classes.itemStyle}>
            <Typography variant="h5">Name</Typography>
          </Grid>
          <Grid item xs={6} className={classes.itemStyle}>
            <Typography variant="h5">
              {props.location.state.name
                ? props.location.state.name
                : "Not Set"}
            </Typography>
          </Grid>
        </Grid>
        <Divider />
        <Grid container spacing={4}>
          <Grid item xs={6} className={classes.itemStyle}>
            <Typography variant="h5">Role</Typography>
          </Grid>
          <Grid item xs={3} className={classes.itemStyle}>
            <Field
              name="role"
              component={RoleSelect}
              {...{
                initialValue: props.initialValues ? props.initialValues : "",
              }}
            >
              <option value="" />
              <option value={USER_ROLE}>{USER_ROLE}</option>
              <option value={ADMIN_ROLE}>{ADMIN_ROLE}</option>
              <option value={HOSPITAL_ADMIN_ROLE}>{HOSPITAL_ADMIN_ROLE}</option>
            </Field>
          </Grid>
          <Grid item xs={3} className={classes.itemStyle}>
            <IconButton
              aria-label="Save"
              type="submit"
              disabled={pristine || submitting}
            >
              <SaveIcon />
            </IconButton>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

const mapStateToProps = (state, props) => {
  let iVal;
  if (!state.form?.adminUserRole?.values?.role) {
    iVal = props.history.location.state.role;
  } else {
    iVal = state.form?.adminUserRole?.values?.role;
  }
  return {
    initialValues: { role: iVal },
  };
};

UserEdit = connect(mapStateToProps, {
  updateUserRole,
  showLoading,
  hideLoading,
})(UserEdit);

UserEdit = reduxForm({
  form: "adminUserRole",
  validate,
  enableReinitialize: true,
})(UserEdit);

export default UserEdit;
