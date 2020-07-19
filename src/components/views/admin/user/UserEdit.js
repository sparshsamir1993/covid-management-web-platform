import React, { useEffect, useLayoutEffect } from "react";
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
import { Field, reduxForm, change } from "redux-form";
import RoleSelect from "../../../adminComponents/RoleSelect";
import {
  USER_ROLE,
  ADMIN_ROLE,
  HOSPITAL_ADMIN_ROLE,
} from "../../../../constants";
import {
  updateUserRole,
  showLoading,
  hideLoading,
  getHospitalList,
} from "../../../../actions";
import { connect } from "react-redux";
import MaterialAutoSelect from "../../../utilComponents/MaterialAutoComplete";

const useStyles = makeStyles(() => ({
  itemStyle: {
    textAlign: "center",
  },
}));
const validate = (values, props) => {
  const errors = {};
  if (!values["role"] && !props.location.state.role) {
    errors["role"] = "Required";
  }
  console.log(values);
  return errors;
};
const setHospitalDetails = (hospital) => (dispatch) => {
  dispatch(change("adminUserRole", "hospital", hospital));
};

let UserEdit = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const [isHAdmin, setURole] = React.useState(false);
  if (!props.location.state.email) {
    history.goBack();
  }
  const changeUserRole = async (values, dispatch) => {
    console.log(values);
    let data = {
      role: values.role ? values.role : props.location?.state?.role,
      id: props.location.state.id,
      hospital: values.hospital,
    };
    props.showLoading();
    await props.updateUserRole(data, props.history);
    props.hideLoading();
  };

  useEffect(() => {
    console.log(props.hospitalList);
  }, [props.hospitalList]);

  useLayoutEffect(() => {
    const getHospitalListFromAPI = async () => {
      await props.getHospitalList(history);
    };
    getHospitalListFromAPI();
  }, []);
  const hospitalSelectChange = (hospitalName) => {
    const hospital = props.hospitalList.filter(
      (hospital) => hospital.name === hospitalName
    )[0];

    props.setHospitalDetails(hospital);
    // console.log(hospitalName);
  };
  const { handleSubmit, pristine, reset, submitting, hospitalList } = props;
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
          {props.selectedRole === HOSPITAL_ADMIN_ROLE && (
            <Grid container spacing={4}>
              <Grid item xs={6} className={classes.itemStyle}>
                <Typography variant="h5">Name</Typography>
              </Grid>
              <Grid item xs={6} className={classes.itemStyle}>
                <Field
                  name="hospitalName"
                  component={MaterialAutoSelect}
                  allowNewInput={false}
                  autoCompleteOptions={hospitalList}
                  labelname="name"
                  {...{
                    initialValues: props.initialValues
                      ? props.initialValues
                      : "",
                  }}
                  handleInputChange={hospitalSelectChange}
                  label="Select Hospital For user"
                />
              </Grid>
            </Grid>
          )}
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
  let hName;
  let hospitalList = state.adminHospitalList;
  iVal = state.form?.adminUserRole?.values?.role;
  hName = state.form?.adminUserRole?.values?.hospitalName;
  if (!iVal) {
    iVal = props.history.location.state.role;
  }
  if (!hName) {
    hName = hospitalList.filter(
      (hospital) =>
        hospital.id === props.history.location.state.hospitalAdmin?.hospitalId
    )[0]?.name;
    hName = hName ? hName : "";
  }

  return {
    initialValues: { role: iVal, hospitalName: { name: hName } },
    selectedRole: iVal,
    hospitalList,
  };
};

UserEdit = connect(mapStateToProps, {
  updateUserRole,
  showLoading,
  hideLoading,
  getHospitalList,
  setHospitalDetails,
})(UserEdit);

UserEdit = reduxForm({
  form: "adminUserRole",
  validate,
  enableReinitialize: true,
})(UserEdit);

export default UserEdit;
