const { db, knexError } = require('../db')


let self = module.exports = {

    getInfo(msg) {
        return new Promise((resolve, reject) => {
            db('channel').first('*').where({ channel_id: msg.channel.parentId })
                .then(data => resolve(data))
                .catch(err => reject(knexError(err, msg)))
        })
    },

    regist(msg) {
        self.getInfo(msg).then(exist => {
            if (!exist)
                db('channel').insert({ channel_id: msg.channel.parentId, register: msg.author.id })
                    .then(() => msg.reply({ content: 'CHANNEL_REGIST_SUCCESS', ephemeral: true }))
                    .catch(err => knexError(err, msg))
        }).catch(() => { return false })
    }
}