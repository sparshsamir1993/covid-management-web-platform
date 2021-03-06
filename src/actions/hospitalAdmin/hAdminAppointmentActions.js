import axios from "axios";
import { API_BASE_URL } from "../../constants";
import {
  getHeaderConfigWithTokens,
  checkResponseAuthHeaders,
} from "../../utils";
import { showAlert } from "../alertActions";
import {
  FETCH_HADMIN_APPOINTMENT_LIST,
  FETCH_HADMIN_APPOINTMENT_LIST_AFTER_CREATE,
  FETCH_HADMIN_APPOINTMENT_DETAIL_AFTER_UPDATE,
  FETCH_HADMIN_APPOINTMENT_DETAIL,
} from "../../constants/reducerConstants";
const BASE_URL = `${API_BASE_URL}/hospital/appointment`;
const getMonthFromString = (mon) => {
  let d = Date.parse(mon + "1, 2012");
  if (!isNaN(d)) {
    return new Date(d).getMonth();
  }
  return -1;
};

export const getHospitalAppointments = (hospitalId, history) => async (
  dispatch
) => {
  try {
    let config = getHeaderConfigWithTokens();
    if (config) {
      let appointmentList = await axios.get(
        `${BASE_URL}/list/${hospitalId}`,
        config
      );
      let tokens = checkResponseAuthHeaders(appointmentList.headers);
      if (!tokens) {
        dispatch(showAlert({ type: "error", content: "Error with tokens" }));
        history.replace("/");
      }
      dispatch({
        type: FETCH_HADMIN_APPOINTMENT_LIST,
        payload: appointmentList.data,
      });
    } else {
      history.replace("/");
    }
  } catch (err) {
    console.log(err);
  }
};

export const bookUserAppointment = (values, history) => async (dispatch) => {
  try {
    let {
      selectedDate,
      selectedTime,
      email,
      name,
      isNewUser,
      userId,
      hospitalId,
    } = values;
    let year = new Date().getFullYear();
    let date = selectedDate.split("-")[0];
    let monthNumber = selectedDate.split("-")[1];
    let appointmentDate = new Date(year, monthNumber, date).setHours(
      0,
      0,
      0,
      0
    );
    let appointmentTime = selectedTime;
    // let isNewUser = !userList.includes(email);s
    debugger;
    if (!appointmentDate || !name || !appointmentTime || !email) {
      dispatch(showAlert({ type: "error", content: "Check all fields" }));
      return;
    }
    let appointmentData = {
      email,
      name,
      appointmentDate,
      appointmentTime: `${appointmentTime}:00:00`,
      isNewUser,
      userId,
      hospitalId,
    };
    let config = getHeaderConfigWithTokens();
    if (config) {
      debugger;
      const appointment = await axios.post(
        `${BASE_URL}/book`,
        appointmentData,
        config
      );
      let tokens = checkResponseAuthHeaders(appointment.headers);
      if (!tokens) {
        dispatch(showAlert({ type: "error", content: "Error with tokens" }));
        history.replace("/");
        return;
      }
      dispatch({
        type: FETCH_HADMIN_APPOINTMENT_LIST_AFTER_CREATE,
        payload: appointment.data,
      });
      history.replace("/hospital/appointment/list");
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

export const updateAppointmentStatus = (values, history) => async (
  dispatch
) => {
  console.log(values);
  let config = getHeaderConfigWithTokens();
  if (config) {
    const hasAppointmentUpdated = await axios.put(
      `${BASE_URL}/updateAppointmentStatus`,
      values,
      config
    );
    let tokens = checkResponseAuthHeaders(hasAppointmentUpdated.headers);
    if (!tokens) {
      dispatch(showAlert({ type: "error", content: "Error with tokens" }));
      history.replace("/");
    }
    dispatch({
      type: FETCH_HADMIN_APPOINTMENT_DETAIL_AFTER_UPDATE,
      payload: values,
    });
    dispatch(
      showAlert({ type: "success", content: "Status changed successfully" })
    );
    history.goBack();
  } else {
    history.replace("/");
  }
};

export const setAppointmentData = (values, history) => async (dispatch) => {
  dispatch({
    type: FETCH_HADMIN_APPOINTMENT_DETAIL,
    payload: values,
  });
};
