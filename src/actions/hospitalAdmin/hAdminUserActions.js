import axios from "axios";
import { API_BASE_URL } from "../../constants";
import {
  getHeaderConfigWithTokens,
  checkResponseAuthHeaders,
} from "../../utils";
import { showAlert } from "../alertActions";
import { FETCH_HADMIN_USER_LIST } from "../../constants/reducerConstants";
const BASE_URL = `${API_BASE_URL}/hospital/user`;

export const getUserListForHospital = (history) => async (dispatch) => {
  try {
    let config = getHeaderConfigWithTokens();
    if (config) {
      const userList = await axios.get(`${BASE_URL}`, config);
      let tokens = checkResponseAuthHeaders(userList.headers);
      if (!tokens) {
        dispatch(showAlert({ type: "error", content: "Error with tokens" }));
        history.replace("/");
      }
      dispatch({ type: FETCH_HADMIN_USER_LIST, payload: userList.data });
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
