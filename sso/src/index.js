import Koa from 'koa';
import mount from 'koa-mount';
import _ from 'koa-route';
import request from 'request';

import db from './db';
import api from './api';
import middleware from './middleware';

const app = new Koa();

db
  .sync()
  .then(() => {
    app.use(async (ctx, next) => {
      try {
        await next();
      } catch (error) {
        await middleware.errorHandling(error, ctx);
      }
    });

    app.use(_.get('/is-alive', middleware.isAlive));
    app.use(mount('/api', api));
    app.listen(process.env.PORT || 3010);

    request({
      uri: `${process.env.PROXY_URL}/register-service` || 'http://localhost:3000/register-service',
      method: 'POST',
      json: {
        status: 200,
        is_alive: true,
        service_name: 'sso',
      },
    });
  })
  .catch(error => {
    throw new Error(error);
  });

export default app;
