import axios from "axios";
import { API_BASE_URL } from "../../constants";
import {
  getHeaderConfigWithTokens,
  checkResponseAuthHeaders,
} from "../../utils";
import { showAlert } from "../alertActions";
const BASE_URL = `${API_BASE_URL}/admin/question`;

export const getQuestionList = (history) => async (dispatch) => {
  try {
    let config = getHeaderConfigWithTokens();
    if (config) {
      console.log(config);
      const questions = await axios.get(`${BASE_URL}/options`, config);
      let tokens = checkResponseAuthHeaders(questions.headers);
      if (!tokens) {
        dispatch(showAlert({ type: "error", content: "Error with tokens" }));
        history.replace("/");
      }
      dispatch({ type: "FETCH_ADMIN_QUESTION_LIST", payload: questions });
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

export const createNewQuestion = (values, history) => async (dispatch) => {
  try {
    let config = getHeaderConfigWithTokens();
    if (config) {
      console.log(values);
      const question = await axios.post(`${BASE_URL}`, values, config);
      let tokens = checkResponseAuthHeaders(question.headers);
      if (!tokens) {
        dispatch(showAlert({ type: "error", content: "Error with tokens" }));
        history.replace("/");
      }
      dispatch(
        showAlert({
          type: "success",
          content: "Question Sucessfully created !",
        })
      );
      history.push("/admin/questions");
    } else {
      history.replace("/");
    }
  } catch (err) {
    console.log(err);
  }
};

export const updateQuestionSubmit = (values, history) => async (dispatch) => {
  try {
    let config = getHeaderConfigWithTokens();
    if (config) {
      console.log(values);
      const question = await axios.patch(`${BASE_URL}`, values, config);
      let tokens = checkResponseAuthHeaders(question.headers);
      if (!tokens) {
        dispatch(showAlert({ type: "error", content: "Error with tokens" }));
        history.replace("/");
      }
      if (question.data && question.data.length > 0 && question.data[0] > 0) {
        dispatch(showAlert({ type: "success", content: "Question Updated !" }));
        dispatch({ type: "QUESTION_LIST_AFTER_UPDATE", payload: values });
        history.push("/admin/questions");
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

export const deleteQuestion = (id, history) => async (dispatch) => {
  try {
    let config = getHeaderConfigWithTokens();
    if (config) {
      const result = await axios.delete(`${BASE_URL}/${id}`, config);
      console.log(result);
      if (result.status === 200) {
        dispatch({ type: "QUESTION_LIST_AFTER_DELETE", payload: id });
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
