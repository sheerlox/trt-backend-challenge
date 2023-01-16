import {
  ExtSubscription,
  ExtSubscriptionCurrency,
  ExtSubscriptionInterval as Interval,
  ExtSubscriptionStatus as Status,
} from '../external/fake-subscriptions-api/fake-subscriptions-api.interfaces';
import { getPreviousMonth } from '../utils/date.utils';
import { Subscription } from './subscriptions.interfaces';
import {
  convertStoreEntryToArray,
  convertStoreToArray,
  subscriptionsRepository,
} from './subscriptions.repository';

export const importSubscriptions = (
  date: string,
  subscriptions: ExtSubscription[],
) => {
  const previousMonthData = subscriptionsRepository.findByDate(
    getPreviousMonth(date),
  );

  const subscriptionsById: Record<string, Subscription> = {};
  let monthlyMrr = 0;

  for (const subscription of subscriptions) {
    if (subscription.currency !== ExtSubscriptionCurrency.USD) continue;

    const subscriptionMrr = computeSubscriptionMrr(subscription);
    const pastSubscriptionMrr =
      previousMonthData?.subscriptions[subscription.id]?.mrr ?? 0;
    const subscriptionMrrDiff = subscriptionMrr - pastSubscriptionMrr;

    subscriptionsById[subscription.id] = {
      ...subscription,
      mrr: subscriptionMrr,
      mrr_difference: subscriptionMrrDiff,
    };

    monthlyMrr += subscriptionMrr;
  }

  const result = {
    date,
    subscriptions: subscriptionsById,
    total_mrr: monthlyMrr,
    total_mrr_difference: monthlyMrr - (previousMonthData?.total_mrr ?? 0),
  };

  subscriptionsRepository.insert(result);
  return result;
};

export const getAllSubscriptions = () => {
  const result = subscriptionsRepository.findAll();

  return convertStoreToArray(result);
};

export const getSubscriptionsByMonth = (month: string) => {
  const result = subscriptionsRepository.findByDate(month);

  if (!result) return result;

  return convertStoreEntryToArray(result);
};

export const computeSubscriptionMrr = ({
  status,
  items,
  percent_off,
  interval,
}: Subscription | ExtSubscription): number => {
  if (status !== Status.ACTIVE) return 0;

  let result = items.reduce(
    (acc, item) => acc + item.unit_amount * item.quantity,
    0,
  );

  if (percent_off !== 0) result *= (100 - percent_off) / 100;

  if (interval === Interval.YEARLY) result /= 12;

  return Math.round(result);
};
