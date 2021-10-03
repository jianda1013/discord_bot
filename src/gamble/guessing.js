const { redis } = require('../db');

let self = module.exports = {
    initialize() {
        redis.create({ request: 'room', key: 'test', data: 123 }).then(() => {
            console.log('good')
        })
    }
}

self.initialize()