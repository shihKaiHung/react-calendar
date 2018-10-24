import { CalendarDay } from 'components/Calendar';
import * as React from 'react';
import { render } from 'react-dom';

const APP = () => (
  <CalendarDay />
);

render(<APP/>, document.getElementById('root'));
