import jwt from 'jsonwebtoken';
import { NotEnoughParamsError } from '../../../../errors';
import config from '../../../../../config';

const userCreateBodyCheck = ctx => {
  const user = ctx.request.body;

  if (!user.name || !user.email || !user.password || !user.confirm_password) {
    throw new NotEnoughParamsError('name, email, password and confirm_password are required!');
  } else if (user.password !== user.confirm_password) {
    throw new NotEnoughParamsError('wrong password confirmation');
  }
};

const userLoginBodyCheck = ctx => {
  const user = ctx.request.body;

  if (!user.email || !user.password) {
    throw new NotEnoughParamsError('name and email are required!');
  } else {
    return {
      email: user.email,
      password: user.password,
    };
  }
};

const generateAccessToken = async user =>
  jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    config.jwt_key.access,
    {
      expiresIn: '1m', //Math.floor((Date.now() + 30000) / 1000),
    },
  );

const generateRefreshToken = async user =>
  jwt.sign(
    {
      _id: user._id,
    },
    config.jwt_key.refresh,
    {
      expiresIn: '7d', //Math.floor((Date.now() + 30000) / 1000),
    },
  );

export default {
  userCreateBodyCheck,
  userLoginBodyCheck,
  generateAccessToken,
  generateRefreshToken,
};
