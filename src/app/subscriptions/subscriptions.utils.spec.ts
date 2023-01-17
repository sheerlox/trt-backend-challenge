import { ExtSubscription } from '../external/fake-subscriptions-api/fake-subscriptions-api.interfaces';
import { computeSubscriptionMrr } from './subscriptions.utils';

describe('Subscriptions Service', () => {
  describe('computeSubscriptionMrr', () => {
    const subscriptionCanceled = {
      id: 'sub-1',
      status: 'canceled',
      items: [
        {
          id: 'sub-1-item-1',
          module: 'awareness',
          unit_amount: 3990,
          quantity: 12,
        },
      ],
      interval: 'yearly',
      currency: 'usd',
      percent_off: 0,
    } as ExtSubscription;

    const subscriptionYearlyBilling = {
      id: 'sub-1',
      status: 'active',
      items: [
        {
          id: 'sub-1-item-1',
          module: 'awareness',
          unit_amount: 3990,
          quantity: 12,
        },
      ],
      interval: 'yearly',
      currency: 'usd',
      percent_off: 0,
    } as ExtSubscription;

    const subscriptionMonthlyBilling = {
      id: 'sub-1',
      status: 'active',
      items: [
        {
          id: 'sub-1-item-1',
          module: 'awareness',
          unit_amount: 399,
          quantity: 100,
        },
      ],
      interval: 'monthly',
      currency: 'usd',
      percent_off: 0,
    } as ExtSubscription;

    const subscriptionWithDiscount = {
      id: 'sub-1',
      status: 'active',
      items: [
        {
          id: 'sub-1-item-1',
          module: 'awareness',
          unit_amount: 399,
          quantity: 100,
        },
      ],
      interval: 'monthly',
      currency: 'usd',
      percent_off: 10,
    } as ExtSubscription;

    const subscriptionWithMultipleItems = {
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
      percent_off: 15,
    } as ExtSubscription;

    const subscriptionInEUR = {
      id: 'sub-1',
      status: 'active',
      items: [
        {
          id: 'sub-1-item-1',
          module: 'awareness',
          unit_amount: 399,
          quantity: 100,
        },
      ],
      interval: 'monthly',
      currency: 'eur',
      percent_off: 0,
    } as ExtSubscription;

    it('should compute MRR for inactive subscription', () => {
      expect(computeSubscriptionMrr(subscriptionCanceled)).toBe(0);
    });

    it('should compute MRR for yearly subscription', () => {
      expect(computeSubscriptionMrr(subscriptionYearlyBilling)).toBe(3990);
    });

    it('should compute MRR for monthly subscription', () => {
      expect(computeSubscriptionMrr(subscriptionMonthlyBilling)).toBe(39900);
    });

    it('should compute MRR for discounted subscription', () => {
      expect(computeSubscriptionMrr(subscriptionWithDiscount)).toBe(35910);
    });

    it('should compute MRR for subscription with multiple items', () => {
      expect(computeSubscriptionMrr(subscriptionWithMultipleItems)).toBe(92387);
    });

    it('should compute MRR for subscription in EUR', () => {
      expect(computeSubscriptionMrr(subscriptionInEUR, 1.068624)).toBe(42638);
    });
  });
});
