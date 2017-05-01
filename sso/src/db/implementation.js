import mongoose from 'mongoose';
import DAO from './dao';

const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

class MongoDaoImpl extends DAO {
  constructor(name, schema) {
    super();
    this.collection = mongoose.model(name, new Schema(schema, { versionKey: false }));
  }

  save(data) {
    return this.collection.create(data);
  }

  update() {
    const params = arguments[0] ? arguments[0] : {};
    const fields = arguments[1] ? arguments[1] : {};
    const options = arguments[2] ? arguments[2] : {};

    return this.collection.update(params, fields, options).exec();
  }

  remove() {
    const params = arguments[0] ? arguments[0] : {};
    const fields = arguments[1] ? arguments[1] : {};
    const options = arguments[2] ? arguments[2] : {};

    return this.collection
      .remove(params, fields, options, (err, entities) => {
        return err ? new Error(err) : entities;
      })
      .exec();
  }

  find() {
    const params = arguments[0] ? arguments[0] : {};
    const fields = arguments[1] ? arguments[1] : {};
    const options = arguments[2] ? arguments[2] : {};

    return this.collection
      .find(params, fields, options, (err, entities) => {
        return err ? new Error(err) : entities;
      })
      .exec();
  }

  findOne() {
    const params = arguments[0] ? arguments[0] : {};
    const fields = arguments[1] ? arguments[1] : {};
    const options = arguments[2] ? arguments[2] : {};

    return this.collection
      .findOne(params, fields, options, (err, entities) => {
        return err ? new Error(err) : entities;
      })
      .exec();
  }
}

module.exports = MongoDaoImpl;
