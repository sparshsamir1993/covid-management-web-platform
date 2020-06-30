import axios from "axios";
import { API_BASE_URL } from "../../constants";
import { checkAndUpdateTokens, checkStoredTokens } from "../../utils";
import { showAlert } from "../alertActions";
const BASE_URL = `${API_BASE_URL}/admin/user`;

export const getUserList = () => async (dispatch) => {
  try {
    const users = await axios.get(`${BASE_URL}`);
    console.log(users);
    dispatch({ type: "FETCH_ADMIN_USER_LIST", payload: users });
  } catch (err) {
    console.log(err);
  }
};
