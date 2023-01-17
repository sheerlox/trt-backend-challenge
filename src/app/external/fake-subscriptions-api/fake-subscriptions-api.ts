import axios from 'axios';
import config from '../../utils/config';
import { GetSubscriptionsResponse } from './fake-subscriptions-api.interfaces';
import { FakeSubscriptionsApiUtils } from './fake-subscriptions-api.utils';

const createFakeSubscriptionsApi = () => {
  const instance = axios.create({ baseURL: config.SUBSCRIPTIONS_API_URL });

  return {
    getSubscriptions: async (): Promise<GetSubscriptionsResponse> => {
      const res = await instance.get<GetSubscriptionsResponse>(
        '/subscriptions',
      );

      return res.data.map((monthlyData) => ({
        ...monthlyData,
        date: FakeSubscriptionsApiUtils.parseDateToISO(monthlyData.date),
      }));
    },
  };
};

export const FakeSubscriptionsApi = createFakeSubscriptionsApi();
