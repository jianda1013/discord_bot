const { knex, knexError, redis } = require('../db');

let self = module.exports = {
    async getUserPot({ channel: { parentId }, author: { id } }) {
        const user = await knex('money').first({ parentId: 'channel_id', id: 'user_id', assets: 'assets' }).where({ channel_id: parentId, user_id: id })
        if (user === undefined)
            await knex('money').insert({ channel_id: parentId, user_id: id, assets: 100 })
        return user ? user : { parentId, id, assets: 100 }
    }
}