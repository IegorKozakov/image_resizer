import Koa from 'koa';
import _ from 'koa-route';
import bodyparser from 'koa-bodyparser';
import controller from './controller';

const app = new Koa();

app.use(
  bodyparser({
    enableTypes: ['json'],
  }),
);

app.use(_.post('/create', controller.create));
app.use(_.post('/login', controller.login));
// app.use(_.post('recover-password', controller.recoverPassword));
// app.use(_.post('recover-password/:recoverToken', controller.recoverPasswordByToken));
export default app;
