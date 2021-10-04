const redis = require("redis");
const client = redis.createClient("6379", process.env.REDIS_URL || "redis");
const _DAY_SECONDS = 24 * 60 * 60

client.on("error", err => {
    console.log(`Error ${err}`);
});

let self = module.exports = {

    create({ key, field, value, expire }) {
        client.hset(key, field, JSON.stringify(value))
        client.expire(key, expire || process.env.CACHE_EXPIRED_TIME || _DAY_SECONDS / 2);
        return 0;
    },

    get({ key, field }) {
        return new Promise((resolve, reject) => {
            client.hget(key, field, (err, result) => {
                if (err) {
                    console.log(err);
                    reject('err');
                }
                else
                    resolve(result);
            })
        })
    },

    del({ key, field }) {
        if (field !== undefined)
            client.hdel(key, field)
        else
            client.del(key)
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


