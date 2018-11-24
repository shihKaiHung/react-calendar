import * as moment from "moment";
import * as React from 'react';
import {compose, withHandlers} from 'recompose';
import styled from 'styled-components';

interface MonthProps {
  currentDate: moment.Moment;
  setNextDate: (date: moment.Moment) => void;
  addCurrentView: (view: number) => void;
  setDate: (date: moment.Moment) => void;
}

interface MonthHandler {
  getDate: (month: string) => void;
  addYear: () => void;
  subtractYear: () => void;
}

type MonthPropsType = MonthProps & MonthHandler;

const BaseComponent: React.SFC<MonthPropsType> = ({currentDate, addYear, subtractYear, getDate}) => {
  const month = moment.monthsShort();
  return (
    <>
      <CalendarSelect>
        <i className="fa fa-angle-left" aria-hidden="true" onClick={subtractYear} />
        <CalendarDate>{currentDate.format('YYYY')}</CalendarDate>
        <i className="fa fa-angle-right" aria-hidden="true" onClick={addYear} />
      </CalendarSelect>
      <WeekWrap>
        {
          month.map((mon, index) => <MonthText key={index} onClick={() => getDate(mon)}>{mon}</MonthText>)
        }
      </WeekWrap>
    </>
  );
};

export const MonthComponent = compose<MonthPropsType, MonthProps>(
  withHandlers<MonthPropsType, MonthHandler>({
    getDate: ({currentDate, setDate, addCurrentView}) => month => {
      const newMonth = currentDate.clone().month(month);
      setDate(newMonth);
      addCurrentView(0);
    },
    addYear: ({setNextDate, currentDate}) => () => {
      const nextYear = currentDate.add(1, "year");
      setNextDate(nextYear);
    },
    subtractYear: ({setNextDate, currentDate}) => () => {
      const nextYear = currentDate.subtract(1, "year");
      setNextDate(nextYear);
    },
  })
)(BaseComponent);

const WeekWrap = styled.div`
  display: flex;
  flex-flow: wrap;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 15px;
`;

const MonthText = styled.div`
  flex: 25%;
  text-align: center;
  cursor: pointer;
  color: #4a4a4a;
  margin-top: 10px;
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
