import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import MaterialTextField from "../../../utilComponents/MaterialTextField";

import { makeStyles, Button } from "@material-ui/core";

const useStyles = makeStyles(() => ({}));

let QuestionForm = (props) => {
  const classes = useStyles();
  const { handleSubmit, submitQuestion, submitting, pristine } = props;
  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(submitQuestion)}>
        <Field name="question" component={MaterialTextField} label="Question" />
        <Button
          variant="contained"
          disabled={pristine || submitting}
          color="primary"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </React.Fragment>
  );
};
QuestionForm = connect(null, null)(QuestionForm);
QuestionForm = reduxForm({ form: "newQuestionForm" })(QuestionForm);

export default QuestionForm;
