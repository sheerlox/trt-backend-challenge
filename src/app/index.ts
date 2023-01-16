import express, { NextFunction, Request, Response } from 'express';
import logger from 'morgan';
import config from './utils/config';

import subscriptionsRouter from './subscriptions/subscriptions.routes';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/subscriptions', subscriptionsRouter);

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    message: err.message,
    stack: config.NODE_ENV !== 'production' ? err.stack : undefined,
  });
});

export default app;
