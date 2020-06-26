import axios from "axios";
import { API_BASE_URL } from "../constants";
import { checkAndUpdateTokens, checkStoredTokens } from "../utils";
const BASE_URL = `${API_BASE_URL}/user`;

export const loginUser = (body, history) => async (dispatch) => {
  console.log(body);

  const user = await axios.post(`${BASE_URL}/login`, body);

  let { token, refreshToken } = user.data;
  console.log(token, refreshToken);
  let tokens = checkAndUpdateTokens(token, refreshToken);
  console.log("finding user iis \n\n\n\n");
  // dispatch({ type: "FETCH_USER", payload: user.data });
  // history.go();
  dispatch(await getUser(tokens, history));
};
export const registerUser = (body) => async (dispatch) => {
  console.log(body);
};

export const getUser = (tokens) => async (dispatch) => {
  let config = {
    headers: {
      authorization: `JWT ${tokens.token}`,
      "refresh-token": tokens.refrshToken,
    },
  };
  const user = await axios.get(`${BASE_URL}/get`, config);
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
