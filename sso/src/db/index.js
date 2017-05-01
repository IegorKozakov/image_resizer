/* @flow */
import mongoose from 'mongoose';
import Imlementation from './implementation';
import schemas from './schemas';

const dbURI = process.env.mongoParams || 'localhost:27017/practise';
const dbDebug = process.env.dbDebug || true;

class DB {
  constructor() {
    this.synced = false;
  }

  sync() {
    if (this.synced) return false;

    return new Promise((resolve, reject) => {
      mongoose.connect(dbURI, {
        db: { native_parser: true },
      });
      mongoose.set('debug', dbDebug);

      mongoose.connection.on('connected', () => {
        Object.keys(schemas).forEach(schema => {
          this[schema] = new Imlementation(schema, schemas[schema]);
        });
        resolve();
      });

      mongoose.connection.on('error', error => {
        reject(error);
      });

      mongoose.connection.on('disconnected', () => {
        throw new Error({ status: 500, message: `lost connection with DB` });
      });
    });
  }
}

const db = new DB();

export default db;
