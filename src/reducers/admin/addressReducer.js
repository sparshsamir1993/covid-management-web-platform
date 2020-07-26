import _ from "lodash";
export default function (state = {}, action) {
  switch (action.type) {
    case "SET_HOSPITAL_ADDRESS":
      return action.payload || false;
    default:
      return state;
  }
}
