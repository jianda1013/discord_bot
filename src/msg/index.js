const Channel = require('../channel')
const Poker = require('../gamble/poker')
const Event = ['!regist', '!coin', 'r', 'poker', 'join']

module.exports = client => {
    client.on("messageCreate", async msg => {
        if (Event.includes(msg.content)) {
            if (msg.content === 'r' && msg.author.id === msg.member.guild.ownerId)
                Channel.regist(msg)
            // if(msg)
            if(msg.content === 'poker')
                Poker.init(msg)
            if(msg.content === 'join')
                Poker.join(msg)

        }
    })
}