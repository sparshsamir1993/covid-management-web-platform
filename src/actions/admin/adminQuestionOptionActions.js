import axios from "axios";
import { API_BASE_URL } from "../../constants";
import {
  getHeaderConfigWithTokens,
  checkResponseAuthHeaders,
} from "../../utils";
import { showAlert } from "../alertActions";
const BASE_URL = `${API_BASE_URL}/admin/questionOption`;

export const getQuestionOptionList = (questionId, history) => async (
  dispatch
) => {
  try {
    let config = getHeaderConfigWithTokens();
    if (config) {
      console.log(config);
      const options = await axios.get(`${BASE_URL}/${questionId}`, config);
      let tokens = checkResponseAuthHeaders(options.headers);
      if (!tokens) {
        dispatch(showAlert({ type: "error", content: "Error with tokens" }));
        history.replace("/");
      }
      dispatch({
        type: "FETCH_ADMIN_QUESTION_OPTIONS_LIST",
        payload: options.data,
      });
    }
  } catch (err) {}
};

export const createQuestionOption = (values, history) => async (dispatch) => {
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
      console.log(question);
      if (question.status == 200 && question.data.id) {
        dispatch({
          type: "QUESTION_OPTION_LIST_AFTER_CREATE",
          payload: question.data,
        });
        dispatch(
          showAlert({
            type: "success",
            content: "Option Sucessfully created !",
          })
        );
      }
      //   history.push("/admin/questions");
    } else {
      history.replace("/");
    }
  } catch (err) {
    console.log(err);
  }
};

export const deleteQuestionOption = (option, history) => async (dispatch) => {
  try {
    let config = getHeaderConfigWithTokens();
    if (config) {
      const question = await axios.delete(
        `${BASE_URL}/${option.optionId}`,
        config
      );
      let tokens = checkResponseAuthHeaders(question.headers);
      if (!tokens) {
        dispatch(showAlert({ type: "error", content: "Error with tokens" }));
      } else {
        if (question.status == 200) {
          dispatch({
            type: "FETCH_ADMIN_QUESTION_OPTION_LIST_AFTER_DELETE",
            payload: option,
          });
          dispatch(
            showAlert({
              type: "success",
              content: "Option Sucessfully deleted !",
            })
          );
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
};

export const setQuestionOptionList = (values, history) => async (dispatch) => {
  console.log(values);
  dispatch({ type: "FETCH_ADMIN_QUESTION_OPTIONS_LIST", payload: values });
};
