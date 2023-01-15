import dotenv from 'dotenv';
import { envsafe, port, str, url } from 'envsafe';

dotenv.config();

const config = envsafe({
  NODE_ENV: str({
    devDefault: 'development',
    choices: ['development', 'test', 'production'],
  }),
  PORT: port({
    devDefault: 3000,
    example: 80,
  }),
  SUBSCRIPTIONS_ENDPOINT: url({
    devDefault: 'https://fake-subscriptions-api.fly.dev/api/subscriptions',
  }),
});

export default config;
