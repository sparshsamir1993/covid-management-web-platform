import _ from "lodash";
import { FETCH_HADMIN_USER_LIST } from "../../constants/reducerConstants";
export default function (state = [], action) {
  switch (action.type) {
    case FETCH_HADMIN_USER_LIST:
      return action.payload || false;
    default:
      return state;
  }
}
