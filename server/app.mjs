import Koa from "koa"
import koaBodyParser from "koa-bodyparser"
import KoaRouter from "koa-router"
import compress from "koa-compress"
import zlib from "zlib"
import createApiRouter from "./createApiRouter"
import createStatsData from "./createStatsData"

const app = new Koa()
const router = new KoaRouter()

const STATS_INTERVAL = 60 * 1000

// Loading the environment port with default fallbacks
const HTTP_PORT = process.env.PORT || 80

// compression
app.use(
    compress({
        filter(contentType) {
            return /text/i.test(contentType)
        },
        threshold: 2048,
        flush: zlib.Z_SYNC_FLUSH
    })
)

// mount parser for applicaton/json content
app.use(koaBodyParser())

const cache = {}

function updateStats() {
    createStatsData()
        .then(stats => {
            cache.stats = stats
        })
        .catch(error => {
            console.error("Error retrieving stats:", error)
        })
}

updateStats()
setInterval(updateStats, STATS_INTERVAL)

/*
 * API endpoints
 */
const apiRouter = createApiRouter(cache)
router.use("/api", apiRouter.routes(), apiRouter.allowedMethods())

app.use(router.routes())

// Start the app
app.listen(HTTP_PORT)
console.log(`Listening on port ${HTTP_PORT}`)
