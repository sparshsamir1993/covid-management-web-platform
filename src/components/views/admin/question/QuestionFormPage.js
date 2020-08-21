import React from "react";

import { makeStyles, Container, Divider, Typography } from "@material-ui/core";
import QuestionForm from "./QuestionForm";
import { connect } from "react-redux";
import {
  createNewQuestion,
  updateQuestionSubmit,
} from "../../../../actions/admin/adminQuestionActions";
import QuestionOptionForm from "./QuestionOptionForm";
import QuestionOptionList from "./QuestionOptionsList";
import { mainStyles } from "../../../../styles/styles";

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
  let appStyles = mainStyles();
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
          <Divider className={appStyles.mt25} />
          <Typography variant="h4" className={appStyles.mt25}>
            Question Options
          </Typography>
          <QuestionOptionList question={question} />
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
