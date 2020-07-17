import axios from "axios";
import { API_BASE_URL } from "../../constants";
import {
  getHeaderConfigWithTokens,
  checkResponseAuthHeaders,
} from "../../utils";
import { showAlert } from "../alertActions";
import { FETCH_HADMIN_APPOINTMENT_LIST } from "../../constants/reducerConstants";
const BASE_URL = `${API_BASE_URL}/hospital/appointment`;
const getMonthFromString = (mon) => {
  let d = Date.parse(mon + "1, 2012");
  if (!isNaN(d)) {
    return new Date(d).getMonth();
  }
  return -1;
};
export const bookUserAppointment = (values, history) => async (dispatch) => {
  try {
    let { selectedDate, selectedTime, email, name, isNewUser, userId } = values;
    console.log(selectedDate, selectedTime);
    let year = new Date().getFullYear();
    let date = selectedDate.split("-")[0];
    let monthNumber = selectedDate.split("-")[1];
    let appointmentDateTime = new Date(year, monthNumber, date, selectedTime);
    // let isNewUser = !userList.includes(email);s
    let appointmentData = {
      email,
      name,
      appointmentDateTime,
      isNewUser,
      userId,
    };
    console.log(appointmentData);
    let config = getHeaderConfigWithTokens();
    if (config) {
      const appointment = await axios.post(
        `${BASE_URL}/book`,
        appointmentData,
        config
      );
      let tokens = checkResponseAuthHeaders(appointment.headers);
      if (!tokens) {
        dispatch(showAlert({ type: "error", content: "Error with tokens" }));
        history.replace("/");
      }
      dispatch({
        type: FETCH_HADMIN_APPOINTMENT_LIST,
        payload: appointment.data,
      });
    } else {
      history.replace("/");
    }
  } catch (err) {
    if (err.response?.status) {
      if (err.response.status === 403 || err.response.status === 500) {
        dispatch(showAlert({ type: "error", content: err.response.message }));
      }
    }
  }
};
