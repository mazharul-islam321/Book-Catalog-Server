/* eslint-disable no-console */
import mongoose from 'mongoose';
import app from './app';
import config from './config/index';

(async function () {
  try {
    await mongoose.connect(config.database_url as string);
    console.log(`🛢   Database is connected successfully`);

    app.listen(config.port, () => {
      console.log(`Server listening on port http://localhost:${config.port}`);
    });
  } catch (err) {
    console.error('Failed to connect database', err);
  }
})();
