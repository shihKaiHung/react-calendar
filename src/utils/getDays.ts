import moment = require("moment");

interface Days {
  label: string;
  currentMonth: boolean;
  isToday: boolean;
}

export const getDays = (currentDate: moment.Moment): Array<Days> => {
  const start = currentDate.clone().startOf('month').weekday(0);
  const end = currentDate.clone().endOf('month').weekday(6);
  const days = end.diff(start, 'days');
  const daysArray = [];
  const now = moment().startOf('day');
  for (let i = 0 ; i < days + 1; i++) {
    const currentDay = start;
    daysArray.push({
      label: currentDay.format('D'),
      currentMonth: currentDay.month() === currentDate.month() && currentDay.year() === currentDay.year(),
      isToday: currentDay.isSame(now),
    });
    start.add(1, "days");
  }
  return daysArray;
};
