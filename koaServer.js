const koa = require('koa');
const Router = require('koa-router')
const route = require('./router/index');
// const controller = require('./controller/index')
const app = new koa();
const router = new Router();
route(router)
//TODO: koa 中间件 和roter路由 混着用的话，会导致async await 失效
// app.use(async (ctx,next)=>{
//     ctx.set("Access-Control-Allow-Origin","*")
//     await next();
// })
// app.use(async (ctx,next)=>{
//     const body = await controller.formUpload(ctx);
//     ctx.status = 200
//     ctx.body = body;
// })
app.use(router.routes())
.use(router.allowedMethods())
.listen(8001,(err)=>{
    !err && console.log('开启成功')
})