import axios from "axios";
import { API_BASE_URL } from "../../constants";
import {
  getHeaderConfigWithTokens,
  checkResponseAuthHeaders,
} from "../../utils";
import { showAlert } from "../alertActions";
const BASE_URL = `${API_BASE_URL}/admin/hospital`;

export const getHospitalList = (history) => async (dispatch) => {
  try {
    let config = getHeaderConfigWithTokens();
    if (config) {
      const hospitals = await axios.get(`${BASE_URL}`, config);
      let tokens = checkResponseAuthHeaders(hospitals.headers);
      if (!tokens) {
        dispatch(showAlert({ type: "error", content: "Error with tokens" }));
        history.replace("/");
      }
      dispatch({ type: "FETCH_ADMIN_HOSPITAL_LIST", payload: hospitals.data });
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

export const createNewHospital = (data, history) => async (dispatch) => {
  try {
    let config = getHeaderConfigWithTokens();
    if (config) {
      const hospital = await axios.post(`${BASE_URL}`, data, config);
      let tokens = checkResponseAuthHeaders(hospital.headers);
      if (!tokens) {
        dispatch(showAlert({ type: "error", content: "Error with tokens" }));
        history.replace("/");
      }
      if (hospital.status === 200) {
        dispatch(
          showAlert({
            type: "success",
            content: "Hospital Successfully created",
          })
        );
        history.goBack();
      }
    } else {
      history.replace("/");
    }
  } catch (err) {}
};

export const updateHospitalSubmit = (data, history) => async (dispatch) => {
  try {
    let config = getHeaderConfigWithTokens();
    if (config) {
      const hostipal = await axios.patch(`${BASE_URL}`, data, config);
      let tokens = checkResponseAuthHeaders(hostipal.headers);
      if (!tokens) {
        dispatch(showAlert({ type: "error", content: "Error with tokens" }));
        history.replace("/");
      }
      if (hostipal.data && hostipal.data.length > 0 && hostipal.data[0] > 0) {
        dispatch(showAlert({ type: "success", content: "Question Updated !" }));
        dispatch({ type: "QUESTION_LIST_AFTER_UPDATE", payload: data });
        history.push("/admin/hospitals");
      } else {
        dispatch(showAlert({ type: "error", content: "Not Updated !" }));
      }
    } else {
      history.replace("/");
    }
  } catch (err) {
    console.log(err);
  }
};

export const deleteHospital = (id, history) => async (dispatch) => {
  try {
    let config = getHeaderConfigWithTokens();
    if (config) {
      const result = await axios.delete(`${BASE_URL}/${id}`, config);
      console.log(result);
      if (result.status === 200) {
        dispatch({ type: "HOSPITAL_LIST_AFTER_DELETE", payload: id });
      } else {
        dispatch(showAlert({ type: "error", content: "Not Deleted !" }));
      }
    } else {
      history.replace("/");
    }
  } catch (err) {
    console.log(err);
  }
};

export const setSelectedHospitalAddress = (data) => async (dispatch) => {
  dispatch({ type: "SET_HOSPITAL_ADDRESS", payload: data });
};
