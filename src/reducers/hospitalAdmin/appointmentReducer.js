import _ from "lodash";
import {
  FETCH_HADMIN_APPOINTMENT_LIST,
  FETCH_HADMIN_APPOINTMENT_LIST_AFTER_CREATE,
} from "../../constants/reducerConstants";
export default function (state = [], action) {
  switch (action.type) {
    case FETCH_HADMIN_APPOINTMENT_LIST:
      return action.payload || false;
    case FETCH_HADMIN_APPOINTMENT_LIST_AFTER_CREATE:
      return [...state, action.payload];
    default:
      return state;
  }
}
