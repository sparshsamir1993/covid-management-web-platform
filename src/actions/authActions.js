import axios from "axios";
import { API_BASE_URL } from "../constants";
import { checkAndUpdateTokens, checkStoredTokens } from "../utils";
import { showError } from "./errorActions";
const BASE_URL = `${API_BASE_URL}/user`;

const errHandler = (err) => (dispatch) => {
  console.log(err.response);
  if (err.response.code) {
    dispatch(showError({ type: "error", content: "user present" }));
  }
};
export const loginUser = (body, history) => async (dispatch) => {
  const user = await axios.post(`${BASE_URL}/login`, body);
  let { token, refreshToken } = user.data;
  console.log(token, refreshToken);
  let tokens = checkAndUpdateTokens(token, refreshToken);
  dispatch(await getUser(tokens, history));
};

export const registerUser = (body) => async (dispatch) => {
  let { email, password } = body;
  try {
    const user = await axios.post(`${BASE_URL}/signup`, { email, password });
    console.log(user);
  } catch (err) {
    console.log(err.response);
    if (err.response?.status) {
      dispatch(showError({ type: "error", content: "User already present" }));
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
  console.log("head is");
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
  dispatch({ type: "FETCH_USER", payload: {} });
};
