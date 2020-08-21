import _ from "lodash";
export default function (state = [], action) {
  let newState;
  switch (action.type) {
    case "FETCH_ADMIN_QUESTION_LIST":
      return action.payload.data || false;
    case "QUESTION_LIST_AFTER_UPDATE":
      let qTbUpdated = state.filter((x) => x.id == action.payload.id);
      qTbUpdated = { ...qTbUpdated, question: action.payload.question };
      newState = [...state, qTbUpdated];
      return newState;
    case "QUESTION_LIST_AFTER_DELETE":
      newState = state.filter((x) => x.id !== action.payload);
      return newState;
    // case "FETCH_ADMIN_QUESTION_OPTION_LIST_AFTER_DELETE":
    //   debugger;
    //   let ques = state.filter((x) => x.id == action.payload.questionId)[0];
    //   ques.qAnswerOptions = ques.qAnswerOptions.filter(
    //     (x) => x.id !== action.payload.optionId
    //   );
    //   newState = [...state, ques];
    //   return newState;
    default:
      return state;
  }
}
