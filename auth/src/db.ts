import mongoose from 'mongoose';

import logger from '@/services/logger';

import config from './config';

const log = logger.withNamespace('app');

async function connectToDatabase() {
  const dbURI = config.db.URI;
  try {
    const db = await mongoose.connect(dbURI);

    console.log(db.connection.readyState);

    log.info('Connected to database successfully.');
  } catch (error) {
    log.error('Error connecting to database', error);
  }
}

export { connectToDatabase };
