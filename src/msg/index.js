const Channel = require('../channel')
const Poker = require('../gamble/poker')
const Event = ['init', 'join', 'fold', 'preflop', 'flop', 'turn', 'draw', 'start']

module.exports = client => {
    client.on("messageCreate", async msg => {
        if (Event.includes(msg.content)) {
            if (msg.content === 'init')
                Poker.init(msg)
            if (msg.content === 'draw')
                Poker.draw(msg)
            if (msg.content === 'join')
                Poker.join(msg)
            if (msg.content === 'start')
                Poker.start(msg)
        }
    })

    client.on("interactionCreate", async msg => {
        console.log(msg.customId)
        msg.reply('good')
    })
}