export const showAlert = (error) => (dispatch) => {
  console.log(error);
  dispatch({
    type: "SHOW_ALERT",
    payload: error,
  });
  setTimeout(function () {
    dispatch(hideAlert());
  }, 3000);
};
export const hideAlert = () => (dispatch) => {
  dispatch({
    type: "HIDE_ALERT",
  });
};
