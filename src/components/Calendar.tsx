import * as moment from 'moment';
import * as React from 'react';
import styled from 'styled-components';
import {day, dayName} from "../utils/week";

interface ClendarDayState {
  year: any;
}

export class CalendarDay extends React.Component<{}, ClendarDayState> {
  constructor(props) {
    super(props);
    this.state = {
      year: moment(),
    };

    this.handleAddMonth = this.handleAddMonth.bind(this);
    this.handleSubtractMonth = this.handleSubtractMonth.bind(this);
  }

  handleAddMonth() {
    this.setState({
      year: this.state.year.add(1, 'month'),
    });
  }

  handleSubtractMonth() {
    this.setState({
      year: this.state.year.subtract(1, 'month'),
    });
  }

  public render() {
    const start = moment().clone().startOf('month').weekday(0);
    const end = moment().clone().endOf('month').weekday(6);
    const days = end.diff(start, 'days')
    console.log(start.format('dddd DD'))
    console.log(end.format('DD'))
    console.log(days)
    return (
      <Wrap>
        <CalendarSelect>
          <i className="fa fa-angle-left" aria-hidden="true" onClick={this.handleSubtractMonth} />
          <CalendarDate>{this.state.year.format('MMMM YYYY' )}</CalendarDate>
          <i className="fa fa-angle-right" aria-hidden="true" onClick={this.handleAddMonth} />
        </CalendarSelect>
        <WeekWrap>
          {day.map(i => <WeekTitle>{dayName[i]}</WeekTitle>)}
        </WeekWrap>
      </Wrap>
    );
  }
}

const Wrap = styled.div`
  width: 200px;
  height: 250px;
  border: 1px solid #b8b8b8;
`;

const CalendarDate = styled.div`
  flex: 1;
  text-align: center;
  font-size: 12px;
  color: #4a4a4a;
`;

const CalendarSelect = styled.div`
  padding: 10px 15px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
`;

const WeekWrap = styled.div`
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 15px;
`;

const WeekTitle = styled.p`
  margin: 0;
  font-size: 12px;
  flex: 1 1 auto;
  text-align: center;
`;
