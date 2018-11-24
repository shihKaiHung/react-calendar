import * as moment from "moment";
import * as React from 'react';
import styled from 'styled-components';
import {day, dayName} from "../utils/week";

interface DaysProps {
  currentDate: moment.Moment;
  handleSubtractMonth: () => void;
  handleAddMonth: () => void;
  addCurrentView: (view: number) => void;
}

export const DaysComponent: React.SFC<DaysProps> = ({currentDate, handleSubtractMonth, handleAddMonth, addCurrentView}) => {

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

  return (
    <>
      <CalendarSelect>
        <i className="fa fa-angle-left" aria-hidden="true" onClick={handleSubtractMonth} />
        <CalendarDate onClick={() => addCurrentView(1)}>{currentDate.format('MMMM YYYY')}</CalendarDate>
        <i className="fa fa-angle-right" aria-hidden="true" onClick={handleAddMonth} />
      </CalendarSelect>
      <WeekWrap>
        {day.map((i, index) =>
          <WeekTitle key={index}>
            {dayName[i]}
          </WeekTitle>)
        }
        {
          daysArray.map((d, index) =>
            <Days currentMonth={d.currentMonth} isToday={d.isToday} key={index}>
              {d.label}
            </Days>)
        }
      </WeekWrap>
    </>
  );
};

const WeekWrap = styled.div`
  display: flex;
  flex-flow: wrap;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 15px;
`;

const WeekTitle = styled.p`
  margin: 0;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 22px;
  width: 22px;
  height: 22px;
  border-radius: 15px;
`;

const Days = styled(WeekTitle)`
  border-radius: 15px;
  background-color: ${props => props.isToday ? "#ff5151" : "none"};
  color: ${props => props.currentMonth ? props.isToday ? "#fff" : "#4a4a4a" : "#d0d0d0"}
`;

const CalendarDate = styled.div`
  flex: 1;
  text-align: center;
  font-size: 12px;
  color: #4a4a4a;
  cursor: pointer;
  margin: 0 20px;
  &:hover{
    background-color: #f2f2f2;
  }
`;

const CalendarSelect = styled.div`
  padding: 10px 15px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  i {
    cursor: pointer;
  }
`;
