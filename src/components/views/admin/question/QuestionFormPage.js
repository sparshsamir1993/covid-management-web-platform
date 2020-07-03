import React from "react";

import { makeStyles, Container } from "@material-ui/core";
import QuestionForm from "./QuestionForm";
import { connect } from "react-redux";
import {
  createNewQuestion,
  updateQuestionSubmit,
} from "../../../../actions/admin/adminQuestionActions";

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
  const updateQuestionSubmit = (vals) => {
    const data = {
      id: vals.values.id,
      question: vals.values.question,
    };
    props.updateQuestionSubmit(data, props.history);
  };
  console.log(props.location?.state);
  const question = props.location?.state;
  return (
    <Container maxWidth="lg">
      <div className={classes.questionForm}>
        {!question && (
          <QuestionForm
            submitQuestion={() => newQuestionSubmit(props.formValues)}
          />
        )}
        {question && (
          <QuestionForm
            initialValues={question}
            isEdit={true}
            submitQuestion={() => updateQuestionSubmit(props.formValues)}
          />
        )}
      </div>
    </Container>
  );
};
const mapStateToProps = (state) => {
  return {
    formValues: state.form.newQuestionForm,
  };
};
export default connect(mapStateToProps, {
  createNewQuestion,
  updateQuestionSubmit,
})(QuestionFormPage);
