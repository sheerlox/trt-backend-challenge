import { DateTime } from 'luxon';

export const validateMonthISOString = (dateString: string): void => {
  if (!dateString.match(/^\d{4}-\d{2}$/))
    throw new Error('Invalid date provided. Expected format: YYYY-MM');
};

export const getPreviousMonth = (dateString: string): string => {
  const date = DateTime.fromISO(dateString);

  if (!date.isValid) throw new Error('Invalid date provided');

  return dateTimeToMonthISO(date.minus({ months: 1 }));
};

export const dateTimeToMonthISO = (date: DateTime): string =>
  date.year.toString() + '-' + date.month.toString().padStart(2, '0');
