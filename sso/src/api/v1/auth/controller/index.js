import User from '../model';
import helpers from './helpers';

const login = async ctx => {
  const userParams = helpers.userLoginBodyCheck(ctx);

  const user = await User.login(userParams);
  const accessToken = await helpers.generateAccessToken(user);
  const refreshToken = await helpers.generateRefreshToken(user);

  ctx.body = {
    status: 200,
    access_token: accessToken,
    refresh_token: refreshToken,
  };
};

const create = async ctx => {
  helpers.userCreateBodyCheck(ctx);
  const body = ctx.request.body;
  const user = await User.create(body);

  ctx.body = user;
};

export default { create, login };
