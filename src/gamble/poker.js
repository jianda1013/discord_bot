const { MessageActionRow, MessageButton } = require('discord.js');
const Table = require('./table')
const Player = require('./player')
const { knex, knexError, redis } = require('../db');

let self = module.exports = {

    ...Table,

    gameStart(msg) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('call')
                    .setLabel('call')
                    .setStyle('PRIMARY')
            ).addComponents(
                new MessageButton()
                    .setCustomId('check')
                    .setLabel('check')
                    .setStyle('SUCCESS')
            ).addComponents(
                new MessageButton()
                    .setCustomId('raise')
                    .setLabel('raise')
                    .setStyle('SUCCESS')
            ).addComponents(
                new MessageButton()
                    .setCustomId('fold')
                    .setLabel('fold')
                    .setStyle('DANGER')
            )
        msg.reply({ content: 'gaming start', components: [row] });
    },


    async join(msg) {
        const { channel: { parentId }, author: { id, username } } = msg;
        const player = JSON.parse(await redis.get({ key: parentId, field: 'players' }))
        if (player.includes(id))
            return msg.reply({ content: `${username} already in the game`, ephemeral: false })
        player.push(id);
        redis.create({ key: parentId, field: 'players', value: player })
        redis.create({ key: parentId, field: id, value: { pool: 100, cards: [] } })
        return msg.reply({ content: `${username} join the game`, ephemeral: false })
    },

    

}