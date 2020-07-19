import axios from "axios";
import { API_BASE_URL } from "../../constants";
import {
  getHeaderConfigWithTokens,
  checkResponseAuthHeaders,
} from "../../utils";
import { showAlert } from "../alertActions";
const BASE_URL = `${API_BASE_URL}/admin/user`;

export const getUserList = (history) => async (dispatch) => {
  try {
    let config = getHeaderConfigWithTokens();
    console.log(config);
    if (config) {
      const users = await axios.get(`${BASE_URL}`, config);
      let tokens = checkResponseAuthHeaders(users.headers);
      if (!tokens) {
        dispatch(showAlert({ type: "error", content: "Error with tokens" }));
        history.replace("/");
      }
      dispatch({ type: "FETCH_ADMIN_USER_LIST", payload: users });
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

export const updateUserRole = (values, history) => async (dispatch) => {
  try {
    console.log(values);
    let config = getHeaderConfigWithTokens();
    if (config) {
      const user = await axios.patch(`${BASE_URL}/updateRole`, values, config);
      console.log(user.headers);
      let tokens = checkResponseAuthHeaders(user.headers);
      if (user.data && user.data.length > 0) {
        if (user.data[0] > 0) {
          dispatch(showAlert({ type: "success", content: "User Updated !" }));
          history.goBack();
        } else {
          dispatch(showAlert({ type: "error", content: "User Not found" }));
        }
      }
    } else {
      history.replace("/");
    }
  } catch (err) {
    console.log(err);
  }
};
