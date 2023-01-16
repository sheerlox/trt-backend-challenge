import express from 'express';
import {
  getAllSubscriptions,
  getSubscriptionsByMonth,
  importSubscriptions,
} from './subscriptions.controller';

const router = express.Router();

router.get('/import', (req, res, next) => {
  importSubscriptions(req, res, next).catch((err) => next(err));
});

router.get('/', (req, res, next) => {
  getAllSubscriptions(req, res, next).catch((err) => next(err));
});

router.get('/:date', (req, res, next) => {
  getSubscriptionsByMonth(req, res, next).catch((err) => next(err));
});

export default router;
