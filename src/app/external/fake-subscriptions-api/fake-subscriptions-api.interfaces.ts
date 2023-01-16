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
  CANCELED = 'canceled',
}

export enum ExtSubscriptionInterval {
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
}

export enum ExtSubscriptionCurrency {
  USD = 'usd',
  EUR = 'eur',
}
