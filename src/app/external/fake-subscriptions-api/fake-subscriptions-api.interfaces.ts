export type GetSubscriptionsResponse = {
  date: string;
  subscriptions: ExtSubscription[];
}[];

export interface ExtSubscription {
  id: string;
  items: ExtSubscriptionItem[];
  status: ExtSubscriptionStatus;
  interval: ExtSubscriptionInterval;
  currency: ExtSubscriptionCurrency;
  percent_off: number;
}

export interface ExtSubscriptionItem {
  id: string;
  module: string;
  unit_amount: number;
  quantity: number;
}

export enum ExtSubscriptionStatus {
  ACTIVE = 'active',
  PAST_DUE = 'past_due',
  UNPAID = 'unpaid',
  CANCELED = 'canceled',
  INCOMPLETE = 'incomplete',
  INCOMPLETE_EXPIRED = 'incomplete_expired',
  TRIALING = 'trialing',
}

export enum ExtSubscriptionInterval {
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
}

export enum ExtSubscriptionCurrency {
  USD = 'usd',
  EUR = 'eur',
}
