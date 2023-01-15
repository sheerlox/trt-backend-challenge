import { DateTime } from 'luxon';
import { dateTimeToMonthISO } from '../../utils/date.utils';

/**
 * parse date from the FakeSubscriptions API to ISO 8601
 *
 * @param dateString date in the format "MMM yy" (e.g. Feb 22)
 * @returns date formatted as YYYY-MM (e.g. 2022-02)
 */
const parseDateToISO = (dateString: string): string => {
  const date = DateTime.fromFormat(dateString, 'MMM yy');

  if (!date.isValid) throw new Error(`Invalid date provided: ${dateString}`);

  return dateTimeToMonthISO(date);
};

export const FakeSubscriptionsApiUtils = {
  parseDateToISO,
};
