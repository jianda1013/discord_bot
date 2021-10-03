const Discord = require('discord.js');
require('./db').knex.migrate.latest()

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

client.once('ready', async () => {
    console.log('hello!');
});

require('./msg')(client)
require('./gamble/guessing')

client.login(process.env.DC_TOKEN, () => {
    console.log('success')
});