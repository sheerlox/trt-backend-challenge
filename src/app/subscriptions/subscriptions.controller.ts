import { FakeSubscriptionsApi } from '../external/fake-subscriptions-api/fake-subscriptions-api';
import { validateMonthISOString } from '../utils/date.utils';
import { AsyncController } from '../utils/express.utils';
import * as SubscriptionsService from './subscriptions.service';

export const importSubscriptions: AsyncController = async (_, res) => {
  const responses = await FakeSubscriptionsApi.getSubscriptions();

  const results = responses.map((res) =>
    SubscriptionsService.importSubscriptions(res.date, res.subscriptions),
  );

  return res.status(201).json(results);
};

export const getAllSubscriptions: AsyncController = async (_, res) => {
  const result = SubscriptionsService.getAllSubscriptions();

  return res.status(200).json(result);
};

export const getSubscriptionsByMonth: AsyncController<
  any,
  any,
  { date: string }
> = async (req, res) => {
  validateMonthISOString(req.params.date);

  const result = SubscriptionsService.getSubscriptionsByMonth(req.params.date);

  if (!result) {
    return res
      .status(404)
      .json({ message: `no entries found for ${req.params.date}` });
  }

  return res.status(200).json(result);
};
