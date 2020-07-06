import React from "react";
import { Container, makeStyles } from "@material-ui/core";
import HospitalForm from "./HospitalForm";
import { connect } from "react-redux";
import {
  showLoading,
  hideLoading,
  showAlert,
  createNewHospital,
} from "../../../../actions";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({
  hospitalForm: {
    marginTop: "80px",
  },
}));

const HospitalFormPage = (props) => {
  const history = useHistory();
  const hospital = props.location?.state;
  const classes = useStyles();
  const newHospitalSubmit = async (vals) => {
    const { name, contact, detailedAddress, lat, lng } = vals;
    if (!name || !contact || !detailedAddress || !lat || !lng) {
      props.showAlert({ type: "error", content: "Fill all fields" });
      return;
    }
    // console.log(vals);
    props.showLoading();
    await props.createNewHospital(vals, history);
    props.hideLoading();
  };
  const updateHospitalSubmit = (vals) => {
    const data = {
      id: vals.values.id,
      question: vals.values.question,
    };
    // props.updateQuestionSubmit(data, props.history);
  };
  return (
    <Container maxWidth="lg">
      <div className={classes.hospitalForm}>
        {!hospital && (
          <HospitalForm
            submitQuestion={() =>
              newHospitalSubmit({
                ...props.formValues,
                ...props.hospitalAddress,
              })
            }
          />
        )}
        {hospital && (
          <HospitalForm
            initialValues={hospital}
            isEdit={true}
            submitQuestion={() => updateHospitalSubmit(props.formValues)}
          />
        )}
      </div>
    </Container>
  );
};
const mapStateToProps = (state) => {
  return {
    formValues: state.form.adminHospitalForm?.values,
    hospitalAddress: state.selectedAddress,
  };
};

export default connect(mapStateToProps, {
  showAlert,
  showLoading,
  hideLoading,
  createNewHospital,
})(HospitalFormPage);
