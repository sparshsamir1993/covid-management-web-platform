import React from "react";

import { makeStyles, Container, Divider } from "@material-ui/core";
import QuestionForm from "./QuestionForm";
import { connect } from "react-redux";
import {
  createNewQuestion,
  updateQuestionSubmit,
} from "../../../../actions/admin/adminQuestionActions";
import QuestionOptionForm from "./QuestionOptionForm";
import QuestionOptionList from "./QuestionOptionsList";

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
      {question && (
        <React.Fragment>
          <Divider />
          <QuestionOptionList questionId={question.id} />
          <QuestionOptionForm questionId={question.id} />
        </React.Fragment>
      )}
    </Container>
  );
};
const mapStateToProps = (state) => {
  return {
    formValues: state.form.newQuestionForm,
    selectedOption: state.selectedOption,
  };
};
export default connect(mapStateToProps, {
  createNewQuestion,
  updateQuestionSubmit,
})(QuestionFormPage);
