import React from "react";
import { reduxForm, Field } from "redux-form";
import { Button } from "@material-ui/core";
import MaterialTextField from "../../../utilComponents/MaterialTextField";
import { connect } from "react-redux";
import {
  showLoading,
  hideLoading,
  createQuestionOption,
} from "../../../../actions";
let QuestionOptionForm = (props) => {
  const addQuestionOption = () => {
    props.createQuestionOption({
      questionId: props.questionId,
      optionContent: props.formValues.values.optionContent,
    });
    props.reset();
  };
  const { handleSubmit, submitting, pristine, isEdit } = props;
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
        Create Option
      </Button>
    </form>
  );
};
const mapStateToProps = (state) => {
  return {
    formValues: state.form.questionOptionForm,
  };
};
QuestionOptionForm = connect(mapStateToProps, {
  showLoading,
  hideLoading,
  createQuestionOption,
})(QuestionOptionForm);
QuestionOptionForm = reduxForm({
  form: "questionOptionForm",
})(QuestionOptionForm);

export default QuestionOptionForm;
