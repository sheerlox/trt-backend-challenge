import axios from 'axios';
import { DateTime } from 'luxon';
import config from '../../utils/config';
import {
  ExtEchangeRatesCurrency,
  GetHistoricalExchangeRatesResponse,
} from './exchange-rates-api.interfaces';

const createExchangeRatesApi = () => {
  const instance = axios.create({ baseURL: config.EXCHANGE_RATES_API_URL });

  const cache: Record<string, number> = {};

  const getHistoricalExchangeRates = async (
    sourceSymbols: ExtEchangeRatesCurrency[],
    targetSymbol: ExtEchangeRatesCurrency,
    dateTime: DateTime,
  ): Promise<Record<ExtEchangeRatesCurrency, number>> => {
    const exchangeRates = {} as Record<ExtEchangeRatesCurrency, number>;
    const date = dateTime.toISODate();

    const missingSymbols: ExtEchangeRatesCurrency[] = [];
    for (const symbol of sourceSymbols) {
      const cacheKey = `${symbol}_${targetSymbol}_${date}`;
      const cacheValue = cache[cacheKey];

      if (!cacheValue) {
        missingSymbols.push(symbol);
      } else {
        exchangeRates[symbol] = cacheValue;
      }
    }

    if (missingSymbols.length === 0) return exchangeRates;

    const { data } = await instance.get<GetHistoricalExchangeRatesResponse>(
      `/${date}`,
      {
        params: {
          base: targetSymbol,
          symbols: missingSymbols.join(','),
        },
      },
    );

    if (!data.success) throw new Error('Exchange rates API error.');

    for (const symbol of missingSymbols) {
      const cacheKey = `${symbol}_${targetSymbol}_${date}`;

      // rates needs to be reversed since we query them
      // in reverse to only have to make one query
      const precision = 1000000;
      const reversedRate =
        Math.round((1 / data.rates[symbol]) * precision) / precision;

      cache[cacheKey] = reversedRate;
      exchangeRates[symbol] = reversedRate;
    }

    return exchangeRates;
  };

  return {
    getHistoricalExchangeRates,
  };
};

export const ExchangeRatesApi = createExchangeRatesApi();
