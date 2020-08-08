import _, { values } from "lodash";
import {
  FETCH_HADMIN_APPOINTMENT_LIST,
  FETCH_HADMIN_APPOINTMENT_LIST_AFTER_CREATE,
  FETCH_HADMIN_APPOINTMENT_DETAIL_AFTER_UPDATE,
  FETCH_HADMIN_APPOINTMENT_DETAIL,
} from "../../constants/reducerConstants";
export default function (state = [], action) {
  switch (action.type) {
    case FETCH_HADMIN_APPOINTMENT_LIST:
      return action.payload || false;
    case FETCH_HADMIN_APPOINTMENT_LIST_AFTER_CREATE:
      return [...state, action.payload];
    case FETCH_HADMIN_APPOINTMENT_DETAIL:
      let arr = state.filter((ap) => ap.id == action.payload.id)[0];
      // debugger;
      if (arr) {
        arr.appointmentStatus = action.payload.appointmentStatus;
        return [...[arr]];
      } else {
        return [];
      }
    case FETCH_HADMIN_APPOINTMENT_DETAIL_AFTER_UPDATE:
      debugger;
      // state = [...state];
      let currAp = [
        ...state.filter((ap) => ap.id === action.payload.appointmentId),
      ][0];
      if (currAp) {
        currAp = {
          ...currAp,
          appointmentStatus: action.payload.appointmentStatus,
        };
        debugger;
        let newArr = [...[currAp]];
        console.log(newArr);
        return newArr;
      }

    default:
      return state;
  }
}
