import { DateTime } from 'luxon';
import {
  ExtSubscription,
  ExtSubscriptionCurrency,
} from '../external/fake-subscriptions-api/fake-subscriptions-api.interfaces';
import {
  currencyToSymbol,
  getAllExchangeRatesToUSD,
} from '../utils/currency.utils';
import { dateTimeToMonthISO, getPreviousMonth } from '../utils/date.utils';
import { Subscription } from './subscriptions.interfaces';
import {
  convertStoreEntryToArray,
  convertStoreToArray,
  subscriptionsRepository,
} from './subscriptions.repository';
import { computeSubscriptionMrr } from './subscriptions.utils';

export const importSubscriptions = async (
  dateTime: DateTime,
  subscriptions: ExtSubscription[],
) => {
  const date = dateTimeToMonthISO(dateTime);
  const previousMonthData = subscriptionsRepository.findByDate(
    getPreviousMonth(date),
  );

  const exchangeRates = await getAllExchangeRatesToUSD(dateTime);

  const subscriptionsById: Record<string, Subscription> = {};
  let totalMrr = 0;

  for (const subscription of subscriptions) {
    const subscriptionMrr = computeSubscriptionMrr(
      subscription,
      subscription.currency !== ExtSubscriptionCurrency.USD
        ? exchangeRates[currencyToSymbol(subscription.currency)]
        : undefined,
    );

    const pastSubscriptionMrr =
      previousMonthData?.subscriptions[subscription.id]?.mrr ?? 0;
    const subscriptionMrrDiff = subscriptionMrr - pastSubscriptionMrr;

    subscriptionsById[subscription.id] = {
      ...subscription,
      mrr: subscriptionMrr,
      mrr_difference: subscriptionMrrDiff,
    };

    totalMrr += subscriptionMrr;
  }

  const result = {
    date,
    subscriptions: subscriptionsById,
    total_mrr: totalMrr,
    total_mrr_difference: totalMrr - (previousMonthData?.total_mrr ?? 0),
  };

  subscriptionsRepository.insert(result);
  return convertStoreEntryToArray(result);
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
