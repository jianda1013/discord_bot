const Discord = require('discord.js');
const db = require('./db');

try { db.migrate.latest() }
catch { console.log(migrate) }

const client = new Discord.Client();

client.once('ready', async () => {
    console.log('hello!');
});

require('./msg')(client)

client.login(process.env.DC_TOKEN, () => {
    console.log('success')
});