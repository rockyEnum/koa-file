const controller = require('../controller/index')
module.exports = (router) => {
    //如果用到了koa-router插件，则中间件使用koa-router提供的写法去写，因为在 await next()执行的时候，走到路由后，发现异步执行后 接口还是响应404
    router.use(async (ctx, next) => {
        ctx.set("Access-Control-Allow-Origin", "*")
        await next();
    })
    router.get('/', async (ctx, next) => {
        console.log(ctx)
        ctx.body = 'sdsd'
    });
    router.post('/upload', async (ctx, next) => {
        const body = await controller.formUpload(ctx);
        ctx.status = 200
        ctx.body = body;
    })
}