const { MessageActionRow, MessageButton } = require('discord.js');
const { knex, knexError, redis } = require('../db');

let self = module.exports = {
    
    shuffle() {
        const cards = Array.from({ length: 52 }, (x, i) => i);
        for (let i = cards.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
        return cards;
    },

    init({ channel: { parentId } }) {
        const card = self.shuffle();
        redis.del({ key: parentId })
        redis.create({ key: parentId, field: 'pool', value: 0 })
        redis.create({ key: parentId, field: 'players', value: [] })
        return redis.create({ key: parentId, field: 'card', value: card })
    },

    async draw({ channel: { parentId } }) {
        let value = JSON.parse(await redis.get({ key: parentId, field: 'card' }))
        let result = value.pop()
        redis.create({ key: parentId, field: 'card', value })
        return result;
    },

    async start(msg) {
        const { channel: { parentId } } = msg;
        const player = JSON.parse(await redis.get({ key: parentId, field: 'players' }))
        player.unshift(player.pop());
        console.log(player[0])
        redis.create({ key: parentId, field: 'players', value: player })
        return msg.reply({ content: `Game Start`, ephemeral: false })
    },
}