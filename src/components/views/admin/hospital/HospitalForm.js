import React from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import MaterialTextField from "../../../utilComponents/MaterialTextField";
import { Button } from "@material-ui/core";
import AddressSearchField from "../../../utilComponents/AddressSearchField";
import { setSelectedHospitalAddress } from "../../../../actions";

let HospitalForm = (props) => {
  const {
    handleSubmit,
    submitQuestion,
    submitting,
    pristine,
    isEdit,
    setSelectedHospitalAddress,
  } = props;
  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(submitQuestion)}>
        <Field name="name" component={MaterialTextField} label="Name" />
        <Field name="contact" component={MaterialTextField} label="Contact" />
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
        />
        <Button
          variant="contained"
          disabled={pristine || submitting}
          color="primary"
          type="submit"
        >
          {isEdit && <span>Update</span>}
          {!isEdit && <span>Submit</span>}
        </Button>
      </form>
    </React.Fragment>
  );
};

HospitalForm = reduxForm({
  form: "adminHospitalForm",
})(HospitalForm);
HospitalForm = connect(null, { setSelectedHospitalAddress })(HospitalForm);

export default HospitalForm;
