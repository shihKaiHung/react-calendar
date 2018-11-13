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

  renderDays() {
    const start = this.state.year.clone().startOf('month').weekday(0);
    const end = this.state.year.clone().endOf('month').weekday(6);
    const days = end.diff(start, 'days');
    const daysArray = [];
    const now = moment().startOf('day');
    for (let i = 0 ; i < days + 1; i++) {
      const currentDay = start;
      daysArray.push({
        label: currentDay.format('D'),
        currentMonth: currentDay.month() === this.state.year.month() && currentDay.year() === this.state.year.year(),
        isToday: currentDay.isSame(now),
      });
      start.add(1, "days");
    }
    return (
        daysArray.map((d, index) =>
        <Days currentMonth={d.currentMonth} isToday={d.isToday} key={index}>
          {d.label}
        </Days>)
    );
  }

  public render() {
    return (
      <Wrap>
        <CalendarSelect>
          <i className="fa fa-angle-left" aria-hidden="true" onClick={this.handleSubtractMonth} />
          <CalendarDate>{this.state.year.format('MMMM YYYY')}</CalendarDate>
          <i className="fa fa-angle-right" aria-hidden="true" onClick={this.handleAddMonth} />
        </CalendarSelect>
        <WeekWrap>
          {day.map((i, index) =>
            <WeekTitle key={index}>
              {dayName[i]}
            </WeekTitle>)
          }
        </WeekWrap>
        <WeekWrap>
          {this.renderDays()}
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
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Days = styled(WeekTitle)`
  flex: 22px;
  width: 22px;
  height: 22px;
  border-radius: 15px;
  background-color: ${props => props.isToday ? "#ff5151" : "none"};
  color: ${props => props.currentMonth ? props.isToday ? "#fff" : "#4a4a4a" : "#d0d0d0"}
`;
