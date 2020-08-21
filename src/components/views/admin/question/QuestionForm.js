import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import MaterialTextField from "../../../utilComponents/MaterialTextField";

import { makeStyles, Button, Divider } from "@material-ui/core";
import QuestionOptionForm from "./QuestionOptionForm";
import { mainStyles } from "../../../../styles/styles";

const useStyles = makeStyles(() => ({}));

let QuestionForm = (props) => {
  let appStyles = mainStyles();
  const classes = useStyles();
  const {
    handleSubmit,
    submitQuestion,
    submitting,
    pristine,
    isEdit,
    initialValues,
  } = props;
  // console.log(props);
  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(submitQuestion)}>
        <Field
          name="question"
          component={MaterialTextField}
          initialValues={{
            question: initialValues?.question ? initialValues.question : [],
          }}
          label="Question"
        />
        <Button
          variant="contained"
          disabled={pristine || submitting}
          className={appStyles.primaryButton}
          type="submit"
        >
          {isEdit && <span>Update</span>}
          {!isEdit && <span>Submit</span>}
        </Button>
      </form>
    </React.Fragment>
  );
};
QuestionForm = connect(null, null)(QuestionForm);
QuestionForm = reduxForm({ form: "newQuestionForm" })(QuestionForm);

export default QuestionForm;
