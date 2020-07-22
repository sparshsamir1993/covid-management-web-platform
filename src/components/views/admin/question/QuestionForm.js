import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import MaterialTextField from "../../../utilComponents/MaterialTextField";

import { makeStyles, Button, Divider } from "@material-ui/core";
import QuestionOptionForm from "./QuestionOptionForm";

const useStyles = makeStyles(() => ({}));

let QuestionForm = (props) => {
  const classes = useStyles();
  const { handleSubmit, submitQuestion, submitting, pristine, isEdit } = props;
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
