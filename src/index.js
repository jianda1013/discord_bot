const Discord = require('discord.js');
require('./db').db.migrate.latest()

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

client.once('ready', async () => {
    console.log('hello!');
});

require('./msg')(client)

client.login(process.env.DC_TOKEN, () => {
    console.log('success')
});