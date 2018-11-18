import * as moment from "moment";
import * as React from 'react';
import styled from 'styled-components';

interface DaysProps {
  currentDate: moment.Moment;
  handleSubtractMonth: () => void;
  handleAddMonth: () => void;
  addCurrentView: () => void;
  setDate: (date: moment.Moment) => void;
}

export const MonthComponent: React.SFC<DaysProps> = ({currentDate, handleSubtractMonth, handleAddMonth}) => {
  const month = moment.monthsShort();
  return (
    <>
      <CalendarSelect>
        <i className="fa fa-angle-left" aria-hidden="true" onClick={handleSubtractMonth} />
        <CalendarDate>{currentDate.format('YYYY')}</CalendarDate>
        <i className="fa fa-angle-right" aria-hidden="true" onClick={handleAddMonth} />
      </CalendarSelect>
      <WeekWrap>
        {
          month.map((mon, index) => <MonthText key={index}>{mon}</MonthText>)
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
