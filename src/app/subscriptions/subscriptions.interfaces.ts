import { ExtSubscription } from '../external/fake-subscriptions-api/fake-subscriptions-api.interfaces';

export interface Subscription extends ExtSubscription {
  mrr: number;
  mrr_difference: number;
}
