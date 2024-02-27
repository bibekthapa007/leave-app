import { config as dotEnvConfig } from 'dotenv-safe';

const pathToEnv = __dirname + '/../.env';

dotEnvConfig({ path: pathToEnv });

const config = {
  NODE_ENV: process.env.NODE_ENV,
  app: {
    name: process.env.APP_NAME || 'auth-server',
    version: process.env.APP_VERSION || '1.1.0',
    port: process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 3000,
    baseURL: process.env.APP_BASE_URL || '/api',
  },
  sentry: {
    dsn: '',
    environment: '',
  },
  db: {
    URI: process.env.DB_URI || 'mongodb://auth-mongo-srv:27017/auth',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
    signOptions: {
      algorithm: 'HS256',
      expiresIn: process.env.JWT_EXPIRESIN || '15m',
    },
    refreshTokenSignOptions: {
      expiresIn: process.env.JWT_REFRESH_EXPIRESIN || '7d',
      algorithm: 'HS256',
    },
  },
  cookieSession: {
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  },
} as const;

export default config;
