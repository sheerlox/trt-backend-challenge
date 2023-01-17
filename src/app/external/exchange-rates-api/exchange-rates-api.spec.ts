import axios from 'axios';
import { DateTime } from 'luxon';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.create.mockReturnThis();

import { ExchangeRatesApi } from './exchange-rates-api';
import { ExtEchangeRatesCurrency } from './exchange-rates-api.interfaces';

describe('ExchangeRates API utils', () => {
  afterEach(() => {
    mockedAxios.get.mockClear();
  });

  describe('getHistoricalExchangeRates', () => {
    const apiResponseMock = {
      data: {
        success: true,
        historical: true,
        base: 'USD',
        date: '2023-01-01',
        rates: { EUR: 0.935783 },
      },
    };
    const expectedResult = { EUR: 1.068624 };

    it('should get and calculate exchange rates', async () => {
      mockedAxios.get.mockResolvedValueOnce(apiResponseMock);
      const result = await ExchangeRatesApi.getHistoricalExchangeRates(
        [ExtEchangeRatesCurrency.EUR],
        ExtEchangeRatesCurrency.USD,
        DateTime.fromISO('2023-01'),
      );

      expect(mockedAxios.get).toHaveBeenCalledWith('/2023-01-01', {
        params: {
          base: 'USD',
          symbols: 'EUR',
        },
      });
      expect(result).toEqual(expectedResult);
    });

    it('should return exchange rates from cache on subsequent requests', async () => {
      const result = await ExchangeRatesApi.getHistoricalExchangeRates(
        [ExtEchangeRatesCurrency.EUR],
        ExtEchangeRatesCurrency.USD,
        DateTime.fromISO('2023-01'),
      );

      expect(mockedAxios.get).not.toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });
  });
});
