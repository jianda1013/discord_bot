const { redis } = require('../db');

let self = module.exports = {
    init(room) {
        redis.create({ request: room, key: "init", data: new Date() }).then(() => {
            console.log('good')
        })
    }
}