export const showLoading = () => (dispatch) => {
  dispatch({
    type: "SHOW_LOADING",
  });
};
export const hideLoading = () => (dispatch) => {
  dispatch({
    type: "HIDE_LOADING",
  });
};
