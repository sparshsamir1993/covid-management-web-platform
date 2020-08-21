import { MONTH_NAMES } from "../constants/appointmentConstants";

export const usersToMonthGraphData = (users) => {
  let data = {};
  let arrToR = [];
  for (let i = 0; i < users.length; i++) {
    let currUser = users[i];
    let { createdAt } = currUser;
    let month = MONTH_NAMES[new Date(createdAt).getMonth()];
    if (!data[month]) {
      data[month] = 1;
    }
    if (data[month]) {
      data[month] = data[month] + 1;
    }
  }
  for (let i = 0; i < MONTH_NAMES.length; i++) {
    arrToR.push({
      month: MONTH_NAMES[i],
      "Number of users": data[MONTH_NAMES[i]] ? data[MONTH_NAMES[i]] : 0,
    });
  }
  console.log(arrToR);
  return arrToR;
};

export const adminAppointmentToMonthGraphData = (appointments) => {
  let data = {};
  let arrToR = [];
  for (let i = 0; i < appointments.length; i++) {
    let currAp = appointments[i];
    let { createdAt } = currAp;
    let month = MONTH_NAMES[new Date(createdAt).getMonth()];
    if (!data[month]) {
      data[month] = 1;
    }
    if (data[month]) {
      data[month] = data[month] + 1;
    }
  }
  for (let i = 0; i < MONTH_NAMES.length; i++) {
    arrToR.push({
      month: MONTH_NAMES[i],
      "Number of appointments": data[MONTH_NAMES[i]] ? data[MONTH_NAMES[i]] : 0,
    });
  }
  console.log(arrToR);
  return arrToR;
};
