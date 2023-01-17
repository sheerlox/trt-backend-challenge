import {
  ExtSubscription,
  ExtSubscriptionInterval as Interval,
  ExtSubscriptionStatus as Status,
} from '../external/fake-subscriptions-api/fake-subscriptions-api.interfaces';
import { Subscription } from './subscriptions.interfaces';

export const computeSubscriptionMrr = (
  { status, items, percent_off, interval }: Subscription | ExtSubscription,
  exchangeRate?: number,
): number => {
  if (status !== Status.ACTIVE) return 0;

  let result = items.reduce(
    (acc, item) => acc + item.unit_amount * item.quantity,
    0,
  );

  if (exchangeRate) result = result * exchangeRate;

  if (percent_off !== 0) result *= (100 - percent_off) / 100;

  if (interval === Interval.YEARLY) result /= 12;

  return Math.round(result);
};
