import mongoose from "mongoose";
import _ from "lodash";

import dotenv from "dotenv";

dotenv.config();

const makeNewConnection = (uri) => {

  const db = mongoose.createConnection(uri);
  

  db.on('error', function (error) {
    console.log(`MongoDB :: connection ${this.name} ${JSON.stringify(error)}`);
    db.close().catch(() => console.log(`MongoDB :: failed to close connection ${this.name}`));
  });
  db.on('connected', function () {
    console.log('Connected');
    mongoose.set('debug', true);
  });

  db.on('disconnected', function () {
    console.log(`MongoDB :: disconnected ${this.name}`);
  });
  return db;
}

const db1Connection = makeNewConnection(process.env.NODE_ENV === "production" ? "mongodb://host.docker.internal:27017/birthdayReminder" : process.env.MONGO_URI);

export {
  db1Connection
}