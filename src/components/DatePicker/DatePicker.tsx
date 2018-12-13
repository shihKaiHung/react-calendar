import {CalendarDay} from "components/Calendar/Calendar";
import * as moment from "moment";
import * as React from 'react';
import styled from 'styled-components';

interface DatePickerState {
  isOpen: boolean;
  currentDate: moment.Moment;
}

export class DatePicker extends React.Component<{}, DatePickerState> {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      currentDate: moment(),
    };

    this.openCalendar = this.openCalendar.bind(this);
    this.setDate = this.setDate.bind(this);
  }

  public openCalendar() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  setDate(date: moment.Moment) {
    this.setState({
      currentDate: date,
    });
  }
  public render() {
    return (
      <>
        <InputBox>
          <DateText>{this.state.currentDate.format("YYYY-MM-DD")}</DateText>
          <Button onClick={this.openCalendar}>T</Button>
        </InputBox>
        <div style={{display: this.state.isOpen ? "block" : "none"}}>
         <CalendarDay setDate={this.setDate} />
        </div>
      </>
    );
  }
}

const InputBox = styled.div`
  width: 180px;
  height: 20px;
  display: flex;
  align-items: center;
  border: 1px solid #d8d8d8;
  padding: 5px;
`;

const DateText = styled.p`
  font-size: 14px;
  margin: 0;
`;

const Button = styled.button`
  margin-left: 20px;
`;
