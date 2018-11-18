import {DaysComponent} from "components/Days";
import {MonthComponent} from "components/Month";
import * as moment from 'moment';
import * as React from 'react';
import styled from 'styled-components';

interface CalendarDayState {
  currentDate: moment.Moment;
  currentView: number;
}

export class CalendarDay extends React.Component<{}, CalendarDayState> {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(),
      currentView: 0,
    };

    this.addCurrentView = this.addCurrentView.bind(this);
    this.handleAddMonth = this.handleAddMonth.bind(this);
    this.handleSubtractMonth = this.handleSubtractMonth.bind(this);
    this.setDate = this.setDate.bind(this);
  }

  addCurrentView() {
    if (this.state.currentView < 3) {
      this.setState({
        currentView: this.state.currentView + 1,
      });
    }
  }

  handleAddMonth() {
    this.setState({
      currentDate: this.state.currentDate.add(1, 'month'),
    });
  }

  handleSubtractMonth() {
    this.setState({
      currentDate: this.state.currentDate.subtract(1, 'month'),
    });
  }

  setDate(date: moment.Moment) {
    this.setState({
      currentDate: date,
    });
  }

  public render() {
    switch (this.state.currentView) {
      case 0:
        return (
          <Wrap>
            <DaysComponent
              addCurrentView={this.addCurrentView}
              currentDate={this.state.currentDate}
              handleAddMonth={this.handleAddMonth}
              handleSubtractMonth={this.handleSubtractMonth}
            />
          </Wrap>
        );
      case 1:
        return (
          <Wrap>
            <MonthComponent
              setDate = {this.setDate}
              addCurrentView={this.addCurrentView}
              currentDate={this.state.currentDate}
              handleAddMonth={this.handleAddMonth}
              handleSubtractMonth={this.handleSubtractMonth}
            />
          </Wrap>
        );
      default:
        return (
          <Wrap>
            <DaysComponent
              addCurrentView={this.addCurrentView}
              currentDate={this.state.currentDate}
              handleAddMonth={this.handleAddMonth}
              handleSubtractMonth={this.handleSubtractMonth}
            />
          </Wrap>
        );
    }
  }
}
const Wrap = styled.div`
  width: 200px;
  height: 250px;
  border: 1px solid #b8b8b8;
`;
