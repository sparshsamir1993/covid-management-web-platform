import _ from "lodash";
export default function (state = {}, action) {
  switch (action.type) {
    case "SET_HOSPITAL_ADDRESS":
      //   const userListObj = _.keyBy(action.payload.data, "id");
      //   console.log(action.payload);
      return action.payload || false;
    default:
      return state;
  }
}
