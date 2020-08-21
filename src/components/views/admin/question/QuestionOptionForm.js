import React, { useEffect, useState } from "react";
import { reduxForm, Field } from "redux-form";
import { Button, FormControlLabel, Checkbox } from "@material-ui/core";
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
  const [initialContent, setInitialContent] = useState("");
  const [isOptionCorrect, setIsOptionCorrect] = useState(false);
  useEffect(() => {
    if (props.initialValues) {
      setInitialContent(props.initialValues.optionContent);
    }
  }, [props.initialValues.optionContent]);

  useEffect(() => {
    return () => {
      // cleanup
      props.deselectOption();
    };
  }, []);
  const addQuestionOption = () => {
    if (props.initialValues.optionContent) {
      props.updateOption({
        optionId: props.initialValues.id,
        questionId: props.initialValues.questionId,
        optionContent: props.formValues.values.optionContent,
        isCorrectOption: props.formValues?.values?.isCorrectOption,
      });
      props.deselectOption();
    } else {
      props.createQuestionOption({
        questionId: props.questionId,
        optionContent: props.formValues.values.optionContent,
        isCorrectOption: props.formValues?.values?.isCorrectOption,
      });
      props.reset();
    }
  };
  const {
    handleSubmit,
    submitting,
    pristine,
    isEdit,
    initialValues,
    input,
  } = props;
  console.log(initialValues);
  return (
    <form onSubmit={handleSubmit(() => addQuestionOption())}>
      <Field
        name="optionContent"
        component={MaterialTextField}
        initialValues={initialValues}
        label="Option Content"
      />
      <Field
        name="isCorrectOption"
        component={({ input }) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={isOptionCorrect}
                checked={input.value ? true : false}
                onChange={input.onChange}
              />
            }
            label="Correct Option ?"
          />
        )}
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
  console.log(state);
  let isCorrectOption;
  if (state.selectedOption.id) {
    isCorrectOption =
      state.selectedOption?.id ==
      state.selectedOption?.question?.correctOptionId;
  }
  return {
    formValues: state.form.questionOptionForm,
    initialValues: { ...state.selectedOption, isCorrectOption },
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
