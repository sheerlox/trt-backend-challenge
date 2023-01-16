import { Subscription } from './subscriptions.interfaces';

type SubscriptionsStore = Record<string, MonthlySubscriptions>;

interface MonthlySubscriptions {
  date: string;
  subscriptions: Record<string, Subscription>;
  total_mrr: number;
  total_mrr_difference: number;
}

const createSubscriptionsRepository = () => {
  const store: SubscriptionsStore = {};

  return {
    findAll(): SubscriptionsStore {
      return store;
    },

    findByDate(date: string): MonthlySubscriptions | undefined {
      return store[date];
    },

    insert(data: MonthlySubscriptions): void {
      store[data.date] = data;
    },
  };
};

export const subscriptionsRepository = createSubscriptionsRepository();

export const convertStoreToArray = (store: SubscriptionsStore) => {
  return Object.values(store).map(convertStoreEntryToArray);
};

export const convertStoreEntryToArray = (entry: MonthlySubscriptions) => ({
  ...entry,
  subscriptions: Object.values(entry.subscriptions),
});
