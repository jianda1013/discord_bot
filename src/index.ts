import Discord from 'discord.js';
import { knex } from './db';

knex.migrate.latest();

const client: Discord.Client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

client.on('ready', () => {
    console.log('Discord Robot Connect')
})

client.login(process.env.DC_TOKEN);

import Interact from './interaction'
Interact(client);