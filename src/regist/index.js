const db = require('../db')
module.exports = {
    async regist(channel_id, register) {
        await db('channel').insert({ channel_id, register })
    }
}