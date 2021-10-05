const Channel = require('../channel')
const Poker = require('../gamble/poker')
const Event = ['init', 'join', 'fold', 'preflop', 'flop', 'turn']

module.exports = client => {
    client.on("messageCreate", async msg => {
        if (Event.includes(msg.content)) {
            if (msg.content === 'init')
                Poker.init(msg)
            if (msg.content === 'join')
                Poker.gameStart(msg)
            if (msg.content === 'flop')
                Poker.initBoard(msg)
            if (msg.content === 'fold')
                Poker.fold(msg)


        }
    })
}