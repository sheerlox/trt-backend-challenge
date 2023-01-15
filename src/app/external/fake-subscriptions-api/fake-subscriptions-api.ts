import axios from 'axios';
import config from '../../utils/config';
import { GetSubscriptionsResponse } from './fake-subscriptions-api.interfaces';
import { FakeSubscriptionsApiUtils } from './fake-subscriptions-api.utils';

export const FakeSubscriptionsApi = {
  getSubscriptions: async (): Promise<GetSubscriptionsResponse> => {
    const res = await axios.get<GetSubscriptionsResponse>(
      config.SUBSCRIPTIONS_ENDPOINT,
    );

    return res.data.map((monthlyData) => ({
      ...monthlyData,
      date: FakeSubscriptionsApiUtils.parseApiDate(monthlyData.date),
    }));
  },
};
