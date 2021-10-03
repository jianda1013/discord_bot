const redis = require("redis");
const client = redis.createClient("6379", process.env.REDIS_URL || "redis");
const _DAY_SECONDS = 24 * 60 * 60

client.on("error", err => {
    console.log(`Error ${err}`);
});

let self = module.exports = {

    create({ request, key, data, expire }) {
        client.hset(request, key, JSON.stringify(data))
        client.expire(request, expire || process.env.CACHE_EXPIRED_TIME || _DAY_SECONDS / 2);
        return Promise.resolve(true)
    },

    get({ request, key }) {
        return new Promise((resolve, reject) => {
            client.hget(request, key, (err, result) => {
                if (err) {
                    console.log(err);
                    reject('err');
                }
                else
                    resolve(result);
            })
        })
    },

    clean() {
        return new Promise(resolve => {
            client.flushall();
            resolve(true)
        })
    },

    quit() {
        return new Promise(resolve => {
            client.quit();
            resolve(true);
        })
    }
}


