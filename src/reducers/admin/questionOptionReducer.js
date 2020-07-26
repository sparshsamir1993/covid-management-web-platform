import _ from "lodash";
export default function (state = [], action) {
  let newState;
  switch (action.type) {
    case "FETCH_ADMIN_QUESTION_OPTIONS_LIST":
      return action.payload || false;
    case "QUESTION_OPTION_LIST_AFTER_CREATE":
      return [...state, action.payload];
    case "QUESTION_OPTIONS_LIST_AFTER_UPDATE":
      let qTbUpdated = state.filter((x) => x.id == action.payload.optionId)[0];
      qTbUpdated = {
        ...qTbUpdated,
        optionContent: action.payload.optionContent,
      };
      newState = [
        ...state.filter((x) => x.id !== action.payload.optionId),
        qTbUpdated,
      ];
      return newState;
    case "FETCH_ADMIN_QUESTION_OPTION_LIST_AFTER_DELETE":
      newState = state.filter((x) => x.id !== action.payload.optionId);
      return newState;
    default:
      return state;
  }
}
