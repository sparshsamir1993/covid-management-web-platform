import { combineReducers } from "redux";
import authReducer from "./authReducer";
import loadingReducer from "./loadingReducer";
import alertReducer from "./alertReducer";
import adminUserReducer from "./admin/userReducer";
import adminQuestionReducer from "./admin/questionReducer";
var formReducer = require("redux-form").reducer;

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  loading: loadingReducer,
  error: alertReducer,
  adminUserList: adminUserReducer,
  adminQuestionList: adminQuestionReducer,
});
