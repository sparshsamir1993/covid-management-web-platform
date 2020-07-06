import React, { useEffect, useState } from "react";
import { reduxForm, Field } from "redux-form";
import { Button } from "@material-ui/core";
import MaterialTextField from "../../../utilComponents/MaterialTextField";
import { connect } from "react-redux";
import {
  showLoading,
  hideLoading,
  createQuestionOption,
  deselectOption,
  updateOption,
} from "../../../../actions";
let QuestionOptionForm = (props) => {
  const [initialContent, setInitialContnet] = useState("");
  useEffect(() => {
    if (props.initialValues) {
      console.log(props.initialValues.optionContent);
      setInitialContnet(props.initialValues.optionContent);
    }
  }, [props.initialValues.optionContent]);

  const addQuestionOption = () => {
    if (props.initialValues.optionContent) {
      props.updateOption({
        optionId: props.initialValues.id,
        optionContent: props.formValues.values.optionContent,
      });
      props.deselectOption();
    } else {
      props.createQuestionOption({
        questionId: props.questionId,
        optionContent: props.formValues.values.optionContent,
      });
      props.reset();
    }
  };
  const { handleSubmit, submitting, pristine, isEdit, initialValues } = props;
  console.log(initialValues);
  return (
    <form onSubmit={handleSubmit(() => addQuestionOption())}>
      <Field
        name="optionContent"
        component={MaterialTextField}
        label="Option Content"
      />
      <Button
        variant="contained"
        disabled={pristine || submitting}
        color="primary"
        type="submit"
      >
        {props.initialValues.optionContent && <span>Edit Option</span>}
        {!props.initialValues.optionContent && <span>Create Option</span>}
      </Button>
      {props.initialValues.optionContent && (
        <Button
          variant="contained"
          // disabled={pristine || submitting}
          color="primary"
          onClick={() => props.deselectOption()}
        >
          Reset Form
        </Button>
      )}
    </form>
  );
};
const mapStateToProps = (state) => {
  return {
    formValues: state.form.questionOptionForm,
    initialValues: state.selectedOption,
  };
};

QuestionOptionForm = reduxForm({
  form: "questionOptionForm",
  enableReinitialize: true,
})(QuestionOptionForm);
QuestionOptionForm = connect(mapStateToProps, {
  showLoading,
  hideLoading,
  createQuestionOption,
  deselectOption,
  updateOption,
})(QuestionOptionForm);
export default QuestionOptionForm;
