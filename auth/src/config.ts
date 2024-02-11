import { config } from 'dotenv-safe';

const pathToEnv = __dirname + '/../.env';

config({ path: pathToEnv });

const serverConfig = {
  NODE_ENV: process.env.NODE_ENV,
  app: {
    name: process.env.APP_NAME || 'job-portal-server',
    version: process.env.APP_VERSION || '1.1.0',
    port: process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 3000,
    baseURL: process.env.APP_BASE_URL || '/api',
  },
  sentry: {
    dsn: '',
    environment: '',
  },
} as const;

export default serverConfig;
