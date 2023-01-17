import { DateTime } from 'luxon';
import { ExchangeRatesApi } from '../external/exchange-rates-api/exchange-rates-api';
import { ExtEchangeRatesCurrency } from '../external/exchange-rates-api/exchange-rates-api.interfaces';
import { ExtSubscriptionCurrency } from '../external/fake-subscriptions-api/fake-subscriptions-api.interfaces';

// those two functions are a bit annoying, but enums are
// a real pain and this preserves strict type-checking
export const currencyToSymbol = (
  currency: ExtSubscriptionCurrency,
): ExtEchangeRatesCurrency => {
  switch (currency) {
    case ExtSubscriptionCurrency.EUR:
      return ExtEchangeRatesCurrency.EUR;
    case ExtSubscriptionCurrency.USD:
      return ExtEchangeRatesCurrency.USD;
  }
};

export const symbolToCurrency = (
  currency: ExtEchangeRatesCurrency,
): ExtSubscriptionCurrency => {
  switch (currency) {
    case ExtEchangeRatesCurrency.EUR:
      return ExtSubscriptionCurrency.EUR;
    case ExtEchangeRatesCurrency.USD:
      return ExtSubscriptionCurrency.USD;
  }
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
