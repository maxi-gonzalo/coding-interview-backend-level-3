const mongoose = require('mongoose');
const _ = require('lodash');

/**
 * Mongo Connection for Local ENV or another ENV.
 */
class MongoConfiguration {
  /**
   *  Connect to Mongo DB.
   */
  connectDB() {
    const DB_URI = process.env.MONGO_URI;
    const USER = process.env.MONGO_USER;
    const PASSWORD = process.env.MONGO_PASSWORD;
    if (_.isEmpty(USER) || _.isEmpty(PASSWORD)) {
      mongoose
        .connect(`${DB_URI}`, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        .then(() => {
          console.info(
            `${process.env.ENVIRONMENT} - MongoDB database locally connected successfully`,
          );
        })
        .catch((err) => {
          console.error(`${process.env.ENVIRONMENT} - Connection MONGO DB local FAILED`, err);
        });
    } else {
      mongoose
        .connect(`${DB_URI}`, {
          user: USER,
          pass: PASSWORD,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        .then(() => {
          console.info(`${process.env.ENVIRONMENT} - Database connected successfully`);
        })
        .catch((err) => {
          console.error(`${process.env.ENVIRONMENT} - Connection MONGO DB FAILED`, err);
        });
    }
  }
}

export default MongoConfiguration;
