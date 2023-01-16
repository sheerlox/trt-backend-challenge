import dotenv from 'dotenv';
import { envsafe, port, str, url } from 'envsafe';

dotenv.config();

const config = envsafe({
  NODE_ENV: str({
    choices: ['development', 'test', 'production'],
  }),
  PORT: port(),
  SUBSCRIPTIONS_ENDPOINT: url(),
});

export default config;
