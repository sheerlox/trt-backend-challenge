import { DateTime } from 'luxon';

export const dateTimeToMonthISO = (date: DateTime): string =>
  date.year.toString() + '-' + date.month.toString().padStart(2, '0');
