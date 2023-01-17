import axios from 'axios';
import dotenv from 'dotenv';
import { envsafe, port, str, url } from 'envsafe';

import { version as API_VERSION } from '../../../package.json';

dotenv.config();

const config = envsafe({
  NODE_ENV: str({
    choices: ['development', 'test', 'production'],
  }),
  API_VERSION: str({ default: API_VERSION as string }),
  PORT: port(),
  SUBSCRIPTIONS_API_URL: url(),
  EXCHANGE_RATES_API_URL: url(),
});

axios.defaults.headers.common = {
  'User-Agent': `riot-backend-challenge/${config.API_VERSION}`,
};

export default config;
