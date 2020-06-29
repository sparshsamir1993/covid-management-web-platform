export const showError = (error) => (dispatch) => {
  console.log(error);
  dispatch({
    type: "SHOW_ERROR",
    payload: error,
  });
  setTimeout(function () {
    dispatch(hideError());
  }, 3000);
};
export const hideError = () => (dispatch) => {
  dispatch({
    type: "HIDE_ERROR",
  });
};
