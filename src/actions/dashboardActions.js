import axios from "axios";
import { API_BASE_URL } from "../constants";
import { checkResponseAuthHeaders, getHeaderConfigWithTokens } from "../utils";
import { showAlert } from "./alertActions";
import {
  appointmentToMonthGraphData,
  appointmentToStatusPieChartData,
} from "../utils/hAdminMetricsUtil";
import {
  FETCH_HADMIN_APPOINTMENT_TO_MONTH_METRICS,
  FETCH_HADMIN_APPOINTMENT_TO_STATUS_METRICS,
} from "../constants/reducerConstants";
const BASE_URL = `${API_BASE_URL}/hospital/metrics`;
export const getHospitalAdminDashboardMetrics = (values, history) => async (
  dispatch
) => {
  let { hospitalId } = values;
  await getHospitalAdminAppointmentMetrics(hospitalId, dispatch, history);
};

export const getAdminDashboardMetrics = () => (dispatch) => {};

const getHospitalAdminAppointmentMetrics = async (
  hospitalId,
  dispatch,
  history
) => {
  try {
    let config = getHeaderConfigWithTokens();
    if (config) {
      let appointmentMetrics = await axios.get(
        `${BASE_URL}/appointment/${hospitalId}`,
        config
      );
      let graphData = appointmentToMonthGraphData(appointmentMetrics.data);
      let pieChartData = appointmentToStatusPieChartData(
        appointmentMetrics.data
      );
      let tokens = checkResponseAuthHeaders(appointmentMetrics.headers);
      if (!tokens) {
        dispatch(showAlert({ type: "error", content: "Error with tokens" }));
        history.replace("/");
      }
      dispatch({
        type: FETCH_HADMIN_APPOINTMENT_TO_MONTH_METRICS,
        payload: graphData,
      });
      dispatch({
        type: FETCH_HADMIN_APPOINTMENT_TO_STATUS_METRICS,
        payload: pieChartData,
      });
    } else {
      history.replace("/");
    }
  } catch (err) {
    console.log(err);
  }
};
