import _ from "lodash";
export default function (state = {}, action) {
  switch (action.type) {
    case "FETCH_ADMIN_USER_LIST":
      //   const userListObj = _.keyBy(action.payload.data, "id");
      return action.payload.data || false;
    default:
      return state;
  }
}
