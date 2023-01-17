import { DateTime } from 'luxon';
import { ExchangeRatesApi } from '../external/exchange-rates-api/exchange-rates-api';
import {
  ExtSubscription,
  ExtSubscriptionCurrency,
  ExtSubscriptionInterval as Interval,
  ExtSubscriptionStatus as Status,
} from '../external/fake-subscriptions-api/fake-subscriptions-api.interfaces';
import { currencyToSymbol } from '../utils/currency.utils';
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

export const getAllExchangeRatesToUSD = async (dateTime: DateTime) => {
  const supportedSymbols = Object.values(ExtSubscriptionCurrency)
    .filter((curr) => curr !== ExtSubscriptionCurrency.USD)
    .map((curr) => currencyToSymbol(curr));

  return ExchangeRatesApi.getHistoricalExchangeRates(
    supportedSymbols,
    currencyToSymbol(ExtSubscriptionCurrency.USD),
    dateTime,
  );
};
