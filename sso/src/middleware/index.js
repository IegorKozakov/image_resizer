import jwt from 'jsonwebtoken';
import * as errors from '../errors';

const errorHandling = async (error, ctx) => {
  if (error instanceof errors.AccessDeniedError) {
    ctx.status = 401;
    ctx.body = {
      status: 401,
      message: error.message || `You need to be logged in!`,
    };
  } else if (error instanceof errors.ExpiredToken) {
    ctx.status = 403;
    ctx.body = {
      status: 403,
      message: error.message || `Expired access token`,
    };
  } else if (error instanceof errors.NotEnoughParamsError) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      message: error.message,
    };
  } else {
    ctx.status = 500;
    ctx.body = {
      status: 500,
      message: error.message || `something goes wrong(((...`,
    };
  }
};

const jwtAuth = async (ctx, next) => {
  const token = ctx.request.headers.token;

  try {
    ctx.user = await jwt.verify(token, 'super_secret_access');
    next();
  } catch (error) {
    throw new errors.ExpiredToken('You nead to bee leged in');
  }
};

const isAlive = async ctx => {
  ctx.body = {
    status: 200,
    is_alive: true,
    sso_adress: `${ctx.request.protocol}'://'${ctx.request.get('host')}`,
  };
};

export default {
  errorHandling,
  jwtAuth,
  isAlive,
};
