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
    dateArray.push(`${nextDate}-${month}`);
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
    hoursArr.push({ hour: hour, isBooked: false });
  }

  return hoursArr;
};
