import _ from "lodash";
export default function (state = [], action) {
  switch (action.type) {
    case "FETCH_ADMIN_HOSPITAL_LIST":
      return action.payload || false;
    case "HOSPITAL_LIST_AFTER_DELETE":
      let newState = state.filter((x) => x.id !== action.payload);
      return newState;

    default:
      return state;
  }
}
