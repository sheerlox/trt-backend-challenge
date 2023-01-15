import express from 'express';
import { FakeSubscriptionsApi } from '../external/fake-subscriptions-api/fake-subscriptions-api';

const router = express.Router();

router.get('/subscriptions', function (req, res) {
  FakeSubscriptionsApi.getSubscriptions()
    .then((result) => res.json(result))
    .catch((err: Error) => res.status(500).json({ error: err }));
});

export default router;
