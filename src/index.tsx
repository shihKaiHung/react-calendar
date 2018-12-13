import { CalendarDay } from 'components/Calendar/Calendar';
import {DatePicker} from "components/DatePicker/DatePicker";
import * as React from 'react';
import { render } from 'react-dom';

const APP = () => (
  <DatePicker />
);

render(<APP/>, document.getElementById('root'));
