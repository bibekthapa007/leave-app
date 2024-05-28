import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import * as Sentry from '@sentry/node';
import cookieSession from 'cookie-session';
import express, { Application, Router, json, urlencoded } from 'express';
import 'express-async-errors';

import requestLogger from '@/middlewares/requestLogger';
import { notFoundError, genericErrorHandler } from '@/middlewares/errorHandler';

import config from 'config';
import logger from 'services/logger';
import { addToStore, initializeStore } from 'services/store';

const log = logger.withNamespace('app');

class App {
  public app: Application;

  constructor(routes: Router) {
    this.app = express();

    // TODO: Uncomment after setting up the sentry
    // this.initializeUnhandelledErrorTracking();
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(compression());

    this.app.set('trust proxy', true);
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));

    this.app.use(cookieSession(config.cookieSession));

    this.app.use(initializeStore());

    this.app.use(requestLogger);

    this.app.use(async (req, res, next) => {
      addToStore({ session: req.session });

      return next();
    });

    this.connectToDatabase();

    this.initializeAPIRoutes(routes);
    this.initializeErrorHandlers();
  }

  async connectToDatabase() {
    if (config.NODE_ENV !== 'test') {
      // await connectToDatabase();
    }
  }

  initializeAPIRoutes(routes: Router) {
    const baseURL = config.app.baseURL;

    this.app.use(baseURL, routes);
  }

  initializeUnhandelledErrorTracking() {
    // Initialize Sentry
    // https://docs.sentry.io/platforms/node/express/
    Sentry.init({
      dsn: config.sentry.dsn,
      environment: config.sentry.environment,
    });

    this.app.use(Sentry.Handlers.requestHandler());

    // Catch unhandled rejection
    process.on('unhandledRejection', err => {
      log.error(`Unhandled rejection ${err}`);

      try {
        Sentry.captureException(err);
      } catch (sentryCaptureError) {
        log.error('Raven error', sentryCaptureError);
      } finally {
        process.exit(1);
      }
    });

    // Catch uncaught exceptions
    process.on('uncaughtException', err => {
      log.error('Unhandled exception', err);

      try {
        Sentry.captureException(err);
      } catch (sentryCaptureError) {
        log.error('Raven error', sentryCaptureError);
      } finally {
        process.exit(1);
      }
    });
  }

  public listen(port: number) {
    this.app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  }

  private initializeErrorHandlers() {
    this.app.use(genericErrorHandler);
    this.app.use(notFoundError);
  }
}

export default App;
