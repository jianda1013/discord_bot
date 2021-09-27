const Channel = require('../channel')
const Event = ['!regist', '!coin', 'r']

module.exports = client => {
    client.on("messageCreate", msg => {
        if (Event.includes(msg.content)) {w
            if (msg.content === 'r' && msg.author.id === msg.member.guild.ownerId)
                Channel.regist(msg)
            // if(msg)
        }
    })
}