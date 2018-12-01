import moment = require("moment");

export const getYears = (currentDate: moment.Moment) => {
  const year = parseInt(currentDate.format('YYYY'), 10);
  const isStartYear = year % 10;
  if (isStartYear !== 0) {
    return year - isStartYear - 1;
  }
}
