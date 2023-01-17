import { jest } from '@jest/globals';
import { DateTime } from 'luxon';
import { ExtEchangeRatesCurrency } from '../external/exchange-rates-api/exchange-rates-api.interfaces';
import { ExtSubscription } from '../external/fake-subscriptions-api/fake-subscriptions-api.interfaces';
import * as SubscriptionsRepositoryModule from './subscriptions.repository';
import {
  computeSubscriptionMrr,
  getAllExchangeRatesToUSD,
} from './subscriptions.utils';

jest.mock('./subscriptions.repository', () => ({
  ...jest.requireActual<typeof SubscriptionsRepositoryModule>(
    './subscriptions.repository',
  ),
  subscriptionsRepository: {
    findAll: jest.fn(),
    findByDate: jest.fn(),
    insert: jest.fn(),
  },
}));
const mockedSubscriptionsRepository = jest.mocked(
  SubscriptionsRepositoryModule.subscriptionsRepository,
);

jest.mock('./subscriptions.utils');
const mockedComputeSubscriptionMrr = jest.mocked(computeSubscriptionMrr);
const mockedGetAllExchangeRatesToUSD = jest.mocked(getAllExchangeRatesToUSD);

import * as SubscriptionsService from './subscriptions.service';

describe('Subscriptions Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  mockedGetAllExchangeRatesToUSD.mockImplementation(async () => ({
    [ExtEchangeRatesCurrency.EUR]: 1.136796,
  }));

  describe('importSubscriptions', () => {
    it('should return correct MRR & MRR diff without previous data', async () => {
      const dateTime = DateTime.fromISO('2022-01');

      const subscriptions = [
        {
          id: 'sub-1',
          status: 'active',
          items: [
            {
              id: 'sub-1-item-1',
              module: 'awareness',
              unit_amount: 399,
              quantity: 12,
            },
          ],
          interval: 'monthly',
          currency: 'usd',
          percent_off: 0,
        },
        {
          id: 'sub-2',
          status: 'active',
          items: [
            {
              id: 'sub-2-item-1',
              module: 'awareness',
              unit_amount: 399,
              quantity: 150,
            },
            {
              id: 'sub-2-item-2',
              module: 'simulation',
              unit_amount: 299,
              quantity: 150,
            },
          ],
          interval: 'monthly',
          currency: 'eur',
          percent_off: 10,
        },
      ] as ExtSubscription[];

      mockedSubscriptionsRepository.findByDate.mockImplementationOnce(
        () => undefined,
      );

      mockedComputeSubscriptionMrr
        .mockImplementationOnce(() => 4788)
        .mockImplementationOnce(() => 107120);

      const result = await SubscriptionsService.importSubscriptions(
        dateTime,
        subscriptions,
      );

      expect(result.subscriptions[0]?.mrr).toBe(4788);
      expect(result.subscriptions[0]?.mrr_difference).toBe(4788);
      expect(result.subscriptions[1]?.mrr).toBe(107120);
      expect(result.subscriptions[1]?.mrr_difference).toBe(107120);
      expect(result.total_mrr).toBe(111908);
      expect(result.total_mrr_difference).toBe(111908);
      expect(mockedSubscriptionsRepository.findByDate).toHaveBeenCalledTimes(1);
      expect(mockedSubscriptionsRepository.findByDate).toHaveBeenCalledWith(
        '2021-12',
      );
      expect(mockedSubscriptionsRepository.insert).toHaveBeenCalledTimes(1);
      expect(mockedComputeSubscriptionMrr).toHaveBeenCalledTimes(2);
    });

    it('should return correct MRR & MRR diff with previous data', async () => {
      const dateTime = DateTime.fromISO('2022-02');

      const previousMonthData = {
        date: '2022-01',
        subscriptions: {
          'sub-1': {
            id: 'sub-1',
            status: 'active',
            items: [
              {
                id: 'sub-1-item-1',
                module: 'awareness',
                unit_amount: 399,
                quantity: 12,
              },
            ],
            interval: 'monthly',
            currency: 'usd',
            percent_off: 0,
            mrr: 4788,
            mrr_difference: 4788,
          },
          'sub-2': {
            id: 'sub-2',
            status: 'active',
            items: [
              {
                id: 'sub-2-item-1',
                module: 'awareness',
                unit_amount: 399,
                quantity: 150,
              },
              {
                id: 'sub-2-item-2',
                module: 'simulation',
                unit_amount: 299,
                quantity: 150,
              },
            ],
            interval: 'monthly',
            currency: 'eur',
            percent_off: 10,
            mrr: 107120,
            mrr_difference: 107120,
          },
        },
        total_mrr: 111908,
        total_mrr_difference: 111908,
      } as SubscriptionsRepositoryModule.MonthlySubscriptions;

      const subscriptions = [
        {
          id: 'sub-1',
          status: 'canceled',
          items: [
            {
              id: 'sub-1-item-1',
              module: 'awareness',
              unit_amount: 399,
              quantity: 12,
            },
          ],
          interval: 'monthly',
          currency: 'usd',
          percent_off: 0,
        },
        {
          id: 'sub-2',
          status: 'active',
          items: [
            {
              id: 'sub-2-item-1',
              module: 'awareness',
              unit_amount: 399,
              quantity: 160,
            },
            {
              id: 'sub-2-item-2',
              module: 'simulation',
              unit_amount: 299,
              quantity: 150,
            },
          ],
          interval: 'monthly',
          currency: 'eur',
          percent_off: 10,
        },
      ] as ExtSubscription[];

      mockedSubscriptionsRepository.findByDate.mockImplementationOnce(
        () => previousMonthData,
      );

      mockedComputeSubscriptionMrr
        .mockImplementationOnce(() => 0)
        .mockImplementationOnce(() => 110191);

      const result = await SubscriptionsService.importSubscriptions(
        dateTime,
        subscriptions,
      );

      expect(result.subscriptions[0]?.mrr).toBe(0);
      expect(result.subscriptions[0]?.mrr_difference).toBe(-4788);
      expect(result.subscriptions[1]?.mrr).toBe(110191);
      expect(result.subscriptions[1]?.mrr_difference).toBe(3071);
      expect(result.total_mrr).toBe(110191);
      expect(result.total_mrr_difference).toBe(-1717);

      expect(mockedSubscriptionsRepository.findByDate).toHaveBeenCalledTimes(1);
      expect(mockedSubscriptionsRepository.findByDate).toHaveBeenCalledWith(
        '2022-01',
      );
      expect(mockedSubscriptionsRepository.insert).toHaveBeenCalledTimes(1);
      expect(mockedComputeSubscriptionMrr).toHaveBeenCalledTimes(2);
    });
  });
});
