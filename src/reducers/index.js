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
import hAdminUserReducer from "./hospitalAdmin/userReducer";
import hAdminHospitalReducer from "./hospitalAdmin/hospitalReducer";
import hAdminAppointmentReducer from "./hospitalAdmin/appointmentReducer";
import hAdminAppointmentToMonthMetricsReducer from "./hospitalAdmin/metrics/appointmentToMonthMetricsReducer";
import hAdminAppointmentToStatusMetricsReducer from "./hospitalAdmin/metrics/appointmentToStatusMetricsReducer";
import adminUsersToMonthAppointmentMetricsReducer from "./admin/metrics/usersToMonthMetricsReducer";
import adminAppointmentsToMonthAppointmentMetricsReducer from "./admin/metrics/appointmentToMonthMetricsReducer";
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
  hospitalUserList: hAdminUserReducer,
  adminMetrics: combineReducers({
    usersToMonth: adminUsersToMonthAppointmentMetricsReducer,
    appointmentToMonth: adminAppointmentsToMonthAppointmentMetricsReducer,
  }),
  hospitalAdmin: combineReducers({
    myHospital: hAdminHospitalReducer,
    appointmentList: hAdminAppointmentReducer,
    metrics: combineReducers({
      appointmentToMonth: hAdminAppointmentToMonthMetricsReducer,
      appointmentToStatus: hAdminAppointmentToStatusMetricsReducer,
    }),
  }),
});
