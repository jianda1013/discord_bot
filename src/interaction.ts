import Discord from 'discord.js';
// import { knex } from './db';
import { checkInChannel, registChannel } from './middleware';

export default function (client: Discord.Client) {
    client.on('messageCreate', async (msg: Discord.Message): Promise<void> => {
        if (await checkInChannel(msg.channelId))
            console.log(msg.channelId);
        else if (msg.content === '!regist') {
            await registChannel(msg.channelId)
            msg.reply('Regist Done');
        }
    })
}