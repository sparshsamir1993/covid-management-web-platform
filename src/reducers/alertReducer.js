export default function (state = { showAlert: false, error: {} }, action) {
  switch (action.type) {
    case "SHOW_ALERT":
      console.log(action.payload);
      return { ...state, showAlert: true, error: action.payload };
    case "HIDE_ALERT":
      return { ...state, showAlert: false };
    default:
      return state;
  }
}
