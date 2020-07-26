export const generateAppointmentDates = () => {
  const startDate = new Date().getDate();
  const currDate = startDate;
  let dateArray = [];
  for (let i = 0; i < 30; i++) {
    let tempDate = new Date();
    let newDate = new Date(tempDate.setDate(currDate + i));
    let nextDate = newDate.getDate();
    // const day = nextDate.toLocaleString("default", { month: "short" });
    const month = newDate.toLocaleString("default", { month: "short" });
    dateArray.push({
      dateText: `${nextDate}-${month}`,
      dateValue: `${nextDate}-${newDate.getMonth()}`,
    });
  }
  return dateArray;
};

export const generateAppointmentHours = () => {
  const startHour = 8;
  let hoursArr = [];
  for (let i = startHour; i < 24; i++) {
    let hour = i;
    if (i < 12) {
      hour = `${i} am`;
    } else if (i == 12) {
      hour = `12 pm`;
    } else {
      hour = `${i - 12} pm`;
    }
    hoursArr.push({ hourText: hour, hourValue: i, isBooked: false });
  }

  return hoursArr;
};

export const getFormattedDateForAppointment = (date) => {
  date = new Date(date);
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(date);
};

export const tConvert = (time) => {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time,
  ];

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join(""); // return adjusted time or original string
};
