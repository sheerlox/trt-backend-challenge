import { ExtSubscription } from '../external/fake-subscriptions-api/fake-subscriptions-api.interfaces';
import { computeSubscriptionMrr } from './subscriptions.service';

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

    it('should compute inactive subscription MRR', () => {
      expect(computeSubscriptionMrr(subscriptionCanceled)).toBe(0);
    });

    it('should compute yearly subscription MRR', () => {
      expect(computeSubscriptionMrr(subscriptionYearlyBilling)).toBe(3990);
    });

    it('should compute monthly subscription MRR', () => {
      expect(computeSubscriptionMrr(subscriptionMonthlyBilling)).toBe(39900);
    });

    it('should compute discounted subscription MRR', () => {
      expect(computeSubscriptionMrr(subscriptionWithDiscount)).toBe(35910);
    });

    it('should compute subscription with multiple items MRR', () => {
      expect(computeSubscriptionMrr(subscriptionWithMultipleItems)).toBe(92387);
    });
  });
});
