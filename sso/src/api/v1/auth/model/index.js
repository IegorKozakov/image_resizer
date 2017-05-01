import bcrypt from 'bcrypt';
import db from '../../../../db';

export default {
  create: requestBody => {
    const user = {
      name: requestBody.name,
      email: requestBody.email,
      password: bcrypt.hashSync(requestBody.password, bcrypt.genSaltSync(8), null),
    };

    return db.users.save(user);
  },
  login: async params => {
    const userData = await db.users.findOne({ email: params.email });
    const comare = await bcrypt.compare(params.password, userData.password);

    if (comare) {
      return userData;
    }
    throw new Error('wrong login or password');
  },

  getById: id => db.users.find({ _id: id }),
  update: (id, params) => db.users.update({ _id: id }, params),
};
