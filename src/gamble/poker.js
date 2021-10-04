const { MessageActionRow, MessageButton } = require('discord.js');
const { knex, knexError, redis } = require('../db')

let self = module.exports = {

	async getInfo({channel: { parentId }, author: { id }}){
		return await knex('money').first().where({ channel_id: parentId, user_id: id })
	},

	async init(msg){
		await knex('money').insert({ channel_id: msg.channel.parentId, user_id: msg.author.id, assets: 100 })
		msg.reply({ content: `you have 100 dollars`, ephemeral: false })
	},


	// async join(msg){
	// 	const data = await redis.get({ request: msg.channel.parentId, key: 'running' })
	// 	if()
	// }
}