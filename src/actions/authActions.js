import axios from "axios";
import { API_BASE_URL } from "../constants";
import { checkAndUpdateTokens, checkStoredTokens } from "../utils";
import { showAlert } from "./alertActions";
const BASE_URL = `${API_BASE_URL}/user`;

export const loginUser = (body, history) => async (dispatch) => {
  try {
    const user = await axios.post(`${BASE_URL}/login`, body);
    let { token, refreshToken } = user.data;
    console.log(token, refreshToken);
    let tokens = checkAndUpdateTokens(token, refreshToken);
    dispatch(await getUser(tokens, history));
    dispatch(
      showAlert({ type: "success", content: "Signed in Successfully !!" })
    );
  } catch (err) {
    console.log(err.response);
    if (
      err.response &&
      (err.response.status === 403 || err.response.status === 401)
    ) {
      dispatch(showAlert({ type: "error", content: err.response.data }));
    }
  }
};

export const registerUser = (body, history) => async (dispatch) => {
  let { email, password } = body;
  try {
    const user = await axios.post(`${BASE_URL}/signup`, { email, password });
    if (user.status === 200) {
      dispatch(
        showAlert({ type: "success", content: "Registered successfully" })
      );
      window.location.reload();
    }
  } catch (err) {
    if (err.response?.status) {
      if (err.response.status === 403) {
        dispatch(showAlert({ type: "error", content: "User already present" }));
      }
    }
  }
};

export const getUser = (tokens) => async (dispatch) => {
  let config = {
    headers: {
      authorization: `JWT ${tokens.token}`,
      "refresh-token": tokens.refreshToken,
    },
  };
  const user = await axios.get(`${BASE_URL}/get`, config);

  let token = user.headers.token;
  let refreshToken = user.headers["refresh-token"];
  checkAndUpdateTokens(token, refreshToken);
  dispatch({ type: "FETCH_USER", payload: user.data });
};

export const logoutUser = () => (dispatch) => {
  const tokens = checkStoredTokens();
  if (tokens) {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("refreshToken");
  }
  dispatch(showAlert({ type: "error", content: "Logged Out !!" }));
  dispatch({ type: "FETCH_USER", payload: {} });
};
