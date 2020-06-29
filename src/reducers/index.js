import { combineReducers } from "redux";
import authReducer from "./authReducer";
import loadingReducer from "./loadingReducer";
import alertReducer from "./alertReducer";
var formReducer = require("redux-form").reducer;

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  loading: loadingReducer,
  error: alertReducer,
});
