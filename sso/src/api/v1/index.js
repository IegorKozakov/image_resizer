import Koa from 'koa';
import mount from 'koa-mount';
import auth from './auth';

const app = new Koa();

app.use(mount('/auth', auth));

export default app;
