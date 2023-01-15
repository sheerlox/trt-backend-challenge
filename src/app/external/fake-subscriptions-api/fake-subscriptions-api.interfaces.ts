export type GetSubscriptionsResponse = {
  date: string;
  subscriptions: Subscription[];
}[];

export interface Subscription {
  id: string;
  items: SubscriptionItem[];
  status: SubscriptionStatus;
  interval: SubscriptionInterval;
  currency: SubscriptionCurrency;
  percent_off: number;
}

export interface SubscriptionItem {
  id: string;
  module: string;
  unit_amount: number;
  quantity: number;
}

export enum SubscriptionStatus {
  ACTIVE = 'active',
  PAST_DUE = 'past_due',
  UNPAID = 'unpaid',
  CANCELED = 'canceled',
  INCOMPLETE = 'incomplete',
  INCOMPLETE_EXPIRED = 'incomplete_expired',
  TRIALING = 'trialing',
}

export enum SubscriptionInterval {
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
}

export enum SubscriptionCurrency {
  USD = 'usd',
  EUR = 'eur',
}
