import React from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import MaterialTextField from "../../../utilComponents/MaterialTextField";
import { Button, Typography } from "@material-ui/core";
import AddressSearchField from "../../../utilComponents/AddressSearchField";
import { setSelectedHospitalAddress } from "../../../../actions";
import { mainStyles } from "../../../../styles/styles";

let HospitalForm = (props) => {
  const {
    handleSubmit,
    submitQuestion,
    submitting,
    pristine,
    isEdit,
    setSelectedHospitalAddress,
  } = props;
  let appStyles = mainStyles();
  return (
    <React.Fragment>
      <Typography variant="h4">
        {isEdit ? "Edit Hospital" : "Create Hospital"}
      </Typography>
      <form onSubmit={handleSubmit(submitQuestion)}>
        <div className={appStyles.mt25}>
          <Field name="name" component={MaterialTextField} label="Name" />
        </div>
        <div className={appStyles.mt25}>
          <Field
            name="contact"
            component={MaterialTextField}
            label="Contact"
            className={appStyles.mt100}
          />
        </div>
        <div className={appStyles.mt25}>
          <Field
            name="detailedAddress"
            component={AddressSearchField}
            label="Detailed Address"
            searchType="establishment"
            onAddressSelect={(data) => setSelectedHospitalAddress(data)}
            {...{
              initialValue: props.initialValues
                ? props.initialValues.detailedAddress
                : "",
            }}
            className={appStyles.mt25}
          />
        </div>
        <div className={appStyles.mt25}>
          <Button
            variant="contained"
            disabled={pristine || submitting}
            className={appStyles.primaryButton}
            type="submit"
          >
            {isEdit && <span>Update</span>}
            {!isEdit && <span>Submit</span>}
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
};

HospitalForm = reduxForm({
  form: "adminHospitalForm",
})(HospitalForm);
HospitalForm = connect(null, { setSelectedHospitalAddress })(HospitalForm);

export default HospitalForm;
