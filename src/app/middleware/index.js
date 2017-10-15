import koaBody from 'koa-body';
import send from 'koa-send';
import router from '../routes/index';

const registerMiddleware = (app) => {
    // multipart uploads
    app.use(koaBody({ multipart: true }));

    // x-response-time
    app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
    });

    // logger
    app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}`);
    });

    // routes
    app
    .use(router.routes())
    .use(router.allowedMethods());

    app.use(async (ctx) => {
        const paff = (ctx.path === '/') ? '/index.html' : ctx.path;
        await send(ctx, paff, { root: __dirname + '/../public' });
    });
};

export default registerMiddleware;