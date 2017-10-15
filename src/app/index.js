import Koa from 'koa';
import middleware from './middleware/index';
const app = new Koa();

middleware(app);

export default app;