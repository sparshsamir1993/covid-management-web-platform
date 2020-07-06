import { combineReducers } from "redux";
import authReducer from "./authReducer";
import loadingReducer from "./loadingReducer";
import alertReducer from "./alertReducer";
import adminUserReducer from "./admin/userReducer";
import adminQuestionReducer from "./admin/questionReducer";
import adminQuestionOptionReducer from "./admin/questionOptionReducer";
import selectedOptionReducer from "./admin/selectedOptionReducer";
import addressReducer from "./admin/addressReducer";
import adminHospitalReducer from "./admin/hospitalReducer";
var formReducer = require("redux-form").reducer;

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  loading: loadingReducer,
  error: alertReducer,
  adminUserList: adminUserReducer,
  adminQuestionList: adminQuestionReducer,
  adminQuestionOptionList: adminQuestionOptionReducer,
  selectedOption: selectedOptionReducer,
  selectedAddress: addressReducer,
  adminHospitalList: adminHospitalReducer,
});
