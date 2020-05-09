import * as moment from 'moment';

export const formatTimeSpan = (seconds: number) => moment().startOf('day')
  .seconds(seconds)
  .format('mm:ss');
