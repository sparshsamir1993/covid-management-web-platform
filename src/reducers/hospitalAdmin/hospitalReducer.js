import _ from "lodash";
import { FETCH_HADMIN_HOSPITAL } from "../../constants/reducerConstants";
export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_HADMIN_HOSPITAL:
      return action.payload || false;
    default:
      return state;
  }
}
