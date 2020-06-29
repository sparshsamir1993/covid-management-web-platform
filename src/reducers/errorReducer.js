export default function (state = { showError: false, error: {} }, action) {
  switch (action.type) {
    case "SHOW_ERROR":
      console.log(action.payload);
      return { ...state, showError: true, error: action.payload };
    case "HIDE_ERROR":
      return { ...state, showError: false };
    default:
      return state;
  }
}
