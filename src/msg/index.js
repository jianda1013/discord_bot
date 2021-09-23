const regist = require('../regist')

module.exports = client => {
    client.on("message", msg => {
        if (msg.content === '!regist' && msg.author.id === msg.member.guild.ownerID)
            regist.regist(msg.channel.parentID, msg.author.id)
    })
}