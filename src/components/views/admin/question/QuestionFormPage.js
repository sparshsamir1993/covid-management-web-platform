import React from "react";

import { makeStyles, Container } from "@material-ui/core";
import QuestionForm from "./QuestionForm";
import { connect } from "react-redux";
import { createNewQuestion } from "../../../../actions/admin/adminQuestionActions";

const useStyles = makeStyles(() => ({
  questionForm: {
    marginTop: "80px",
  },
}));
let QuestionFormPage = (props) => {
  const classes = useStyles();

  const newQuestionSubmit = (vals) => {
    props.createNewQuestion(vals.values, props.history);
  };

  return (
    <Container maxWidth="lg">
      <div className={classes.questionForm}>
        <QuestionForm
          submitQuestion={() => newQuestionSubmit(props.formValues)}
        />
      </div>
    </Container>
  );
};
const mapStateToProps = (state) => {
  return {
    formValues: state.form.newQuestionForm,
  };
};
export default connect(mapStateToProps, { createNewQuestion })(
  QuestionFormPage
);
