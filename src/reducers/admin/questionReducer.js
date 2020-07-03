import _ from "lodash";
export default function (state = {}, action) {
  let newState;
  switch (action.type) {
    case "FETCH_ADMIN_QUESTION_LIST":
      //   const userListObj = _.keyBy(action.payload.data, "id");
      //   console.log(action.payload);
      return action.payload.data || false;
    case "QUESTION_LIST_AFTER_UPDATE":
      console.log(action);
      // let newState = state.filter((x) => x.id !== action.payload.id);
      let qTbUpdated = state.filter((x) => x.id == action.payload.id);
      qTbUpdated = { ...qTbUpdated, question: action.payload.question };
      newState = [...state, qTbUpdated];
      return newState;
    case "QUESTION_LIST_AFTER_DELETE":
      newState = state.filter((x) => x.id !== action.payload);
      return newState;
    default:
      return state;
  }
}
