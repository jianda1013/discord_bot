const { MessageActionRow, MessageButton } = require('discord.js');
const { knex, knexError, redis } = require('../db');

let self = module.exports = {

    gameStart(msg) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('test')
                    .setLabel('Hello')
                    .setStyle('PRIMARY'),
            );
        msg.reply({ content: 'Pong!', components: [row] });
    },

    shuffle() {
        const cards = Array.from({ length: 52 }, (x, i) => i);
        for (let i = cards.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
        return cards;
    },

    async draw({ channel: { parentId } }) {
        let value = await redis.get({ key: parentId, field: 'card' })
        value = JSON.parse(value)
        let result = value.pop()
        redis.create({ key: parentId, field: 'card', value })
        return result;
    },

    init({ channel: { parentId } }) {
        const value = self.shuffle();
        redis.del({ key: parentId })
        return redis.create({ key: parentId, field: 'card', value })
    },

    async giveCard(msg) {
        const new_card = await self.draw(msg)
        let value = await redis.get({ key: msg.channel.parentId, field: msg.author.id })
        value = value === null ? [] : JSON.parse(value)
        value.push(new_card)
        redis.create({ key: msg.channel.parentId, field: msg.author.id, value })
        return msg.reply({ content: JSON.stringify(value), ephemeral: false })
    },

    call() {

    },

    raise() {

    },

    fold(msg) {
        redis.del({ key: msg.channel.parentId, field: msg.author.id })
    },

    async join(msg) {
        let hand = [];
        for (let i = 0; i < 2; i++) {
            let item = await self.draw(msg)
            hand.push(item)
        }
        redis.create({ key: msg.channel.parentId, field: msg.author.id, value: hand })
        return msg.reply({ content: JSON.stringify(hand), ephemeral: true })
    },

    async initBoard(msg) {
        let board = [];
        for (let i = 0; i < 3; i++) {
            let item = await self.draw(msg)
            board.push(item)
        }
        redis.create({ key: msg.channel.parentId, field: 'board', value: board })
        return msg.reply({ content: JSON.stringify(board), ephemeral: false })
    },

    // async



}



// self.draw();