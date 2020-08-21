import _ from "lodash";

import { FETCH_HADMIN_APPOINTMENT_TO_MONTH_METRICS } from "../../../constants/reducerConstants";
export default function (state = [], action) {
  switch (action.type) {
    case FETCH_HADMIN_APPOINTMENT_TO_MONTH_METRICS:
      return action.payload || false;
    default:
      return state;
  }
}
