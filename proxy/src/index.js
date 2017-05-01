import Koa from 'koa';
import _ from 'koa-route';
import controller from './controller';
import Checker from './checker';

const app = new Koa();
const checker = new Checker();

checker.on('service:lost', info => {
  console.log(info);
});


app.use(_.post('/register-service', controller.registerService));
app.listen(process.PORT || 3000);

export default app;
