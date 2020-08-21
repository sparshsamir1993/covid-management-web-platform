import {
  MONTH_NAMES,
  APPOINTMENT_STATUS_TYPES,
} from "../constants/appointmentConstants";

export const appointmentToMonthGraphData = (appointments) => {
  let dataToReturn = {};
  let arrToR = [];
  for (let i = 0; i < appointments.length; i++) {
    let currAppointment = appointments[i];
    let month =
      MONTH_NAMES[new Date(currAppointment.appointmentDate).getMonth()];
    if (!dataToReturn[month]) {
      dataToReturn[month] = 1;
    }
    dataToReturn[month] = dataToReturn[month] + 1;
  }
  for (let i = 0; i < MONTH_NAMES.length; i++) {
    arrToR.push({
      month: MONTH_NAMES[i],
      numAppointments: dataToReturn[MONTH_NAMES[i]]
        ? dataToReturn[MONTH_NAMES[i]]
        : 0,
    });
  }
  return arrToR;
};

export const appointmentToStatusPieChartData = (appointments) => {
  let dataToReturn = {};
  let arrToR = [];
  for (let i = 0; i < appointments.length; i++) {
    let currAppointment = appointments[i];
    let apStatus = currAppointment.appointmentStatus;
    if (!dataToReturn[apStatus]) {
      dataToReturn[apStatus] = 0;
    }
    dataToReturn[apStatus] = dataToReturn[apStatus] + 1;
  }
  for (let i = 0; i < APPOINTMENT_STATUS_TYPES.length; i++) {
    arrToR.push({
      name: APPOINTMENT_STATUS_TYPES[i],
      values: dataToReturn[APPOINTMENT_STATUS_TYPES[i]]
        ? dataToReturn[APPOINTMENT_STATUS_TYPES[i]]
        : 0,
    });
  }
  return arrToR;
};
