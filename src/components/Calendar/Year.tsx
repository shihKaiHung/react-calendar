import {List} from "immutable";
import * as moment from "moment";
import * as React from 'react';
import {compose, withHandlers, withProps} from 'recompose';
import styled from 'styled-components';
import {getYears} from "../../utils/getYears";

interface YearProps {
  currentDate: moment.Moment;
  setNextDate: (date: moment.Moment) => void;
  addCurrentView: (view: number) => void;
  setDate: (date: moment.Moment) => void;
}

interface YearInjectProps {
  yearArray: List<number>;
}

interface YearHandler {
  getDate: (year: number) => void;
  addYear: () => void;
  subtractYear: () => void;
}

type YearPropsType = YearProps & YearHandler & YearInjectProps;

const BaseComponent: React.SFC<YearPropsType> = ({currentDate, addYear, subtractYear, getDate, yearArray}) => {
  const thisYear = parseInt(moment().format("YYYY"), 10);
  return (
    <>
      <CalendarSelect>
        <i className="fa fa-angle-left" aria-hidden="true" onClick={subtractYear} />
        <CalendarDate>{ yearArray.get(1) } - { yearArray.get(10) }</CalendarDate>
        <i className="fa fa-angle-right" aria-hidden="true" onClick={addYear} />
      </CalendarSelect>
      <WeekWrap>
        {
          yearArray.map((year, index) => (
            <YearText
              key={index}
              isThisYear={year === thisYear}
              onClick={() => getDate(year)}
              isDecade={index > 0 && index < 11}
            >{year}</YearText>
          )).toArray()
        }
      </WeekWrap>
    </>
  );
};

export const YearComponent = compose<YearPropsType, YearProps>(
  withProps<YearInjectProps, YearProps>(({currentDate}) => {
    const tYear = getYears(currentDate);
    const yearArray = List().setSize(12).map((i, index) => tYear + index).toList();
    return {
      yearArray,
    };
  }),
  withHandlers<YearPropsType, YearHandler>({
    getDate: ({currentDate, setDate, addCurrentView}) => year => {
      const newYear = currentDate.clone().year(year);
      setDate(newYear);
      addCurrentView(1);
    },
    addYear: ({setNextDate, currentDate}) => () => {
      const nextYear = currentDate.add(10, "year");
      setNextDate(nextYear);
    },
    subtractYear: ({setNextDate, currentDate}) => () => {
      const nextYear = currentDate.subtract(10, "year");
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

const YearText = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 25%;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
  margin-top: 20px;
  color: ${props => props.isDecade ? props.isThisYear ? "#fff" : "#4a4a4a" : "#d0d0d0"}
  background-color: ${props => props.isThisYear ? "#ff5151" : "none"};
  border-radius: 50px;
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
