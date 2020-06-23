import { combineReducers } from "redux";
import authReducer from "./authReducer";
var formReducer = require("redux-form").reducer;

export default combineReducers({
  auth: authReducer,
  form: formReducer,
});
