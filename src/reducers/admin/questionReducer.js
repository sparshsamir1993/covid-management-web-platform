import _ from "lodash";
export default function (state = {}, action) {
  switch (action.type) {
    case "FETCH_ADMIN_QUESTION_LIST":
      //   const userListObj = _.keyBy(action.payload.data, "id");
      //   console.log(action.payload);
      return action.payload.data || false;
    case "QUESTION_LIST_AFTER_UPDATE":
      let newState = state.filter((x) => x.id !== action.id);
      let qTbUpdated = state.filter((x) => x.id == action.id);
      qTbUpdated = { ...qTbUpdated, question: action.question };
      newState = [...newState, qTbUpdated];
      return newState;
    default:
      return state;
  }
}
