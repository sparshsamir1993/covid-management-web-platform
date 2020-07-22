import _ from "lodash";
import { FETCH_HADMIN_APPOINTMENT_LIST } from "../../constants/reducerConstants";
export default function (state = [], action) {
  switch (action.type) {
    case FETCH_HADMIN_APPOINTMENT_LIST:
      return action.payload || false;
    default:
      return state;
  }
}
