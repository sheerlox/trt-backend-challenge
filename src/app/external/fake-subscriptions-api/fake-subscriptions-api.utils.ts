import { DateTime } from 'luxon';

/**
 * format date from the FakeSubscriptions API
 *
 * @param apiDate (example: Feb 22)
 * @returns formattedDate (YYYY-MM)
 */
const parseApiDate = (apiDate: string): string => {
  const date = DateTime.fromFormat(apiDate, 'MMM yy');

  if (!date.isValid) throw new Error('Invalid date provided');

  return date.year.toString() + '-' + date.month.toString().padStart(2, '0');
};

export const FakeSubscriptionsApiUtils = {
  parseApiDate,
};
