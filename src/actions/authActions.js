import axios from "axios";
import { API_BASE_URL } from "../constants";
const BASE_URL = `${API_BASE_URL}/user`;

export const loginUser = (body) => async (dispatch) => {
  console.log(body);

  const user = await axios.post(`${BASE_URL}/login`, body);
  console.log(user);
};
