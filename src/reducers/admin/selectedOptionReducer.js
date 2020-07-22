import _ from "lodash";
export default function (state = {}, action) {
  let newState;
  switch (action.type) {
    case "SELECT_ANSWER_OPTION":
      return action.payload || false;
    case "DESELECT_ANSWER_OPTION":
      return {};
    default:
      return state;
  }
}
