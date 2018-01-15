import KoaRouter from "koa-router"

export default cache =>
    new KoaRouter().get("/stats", async ctx => {
        ctx.body = cache.stats
    })
