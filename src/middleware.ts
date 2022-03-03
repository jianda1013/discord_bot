import Discord from 'discord.js';
import { knex } from './db';
import { Channel } from './db/interface';

const checkInChannel = async (channelId: string): Promise<boolean> => {
    const channels = await knex<Channel>('channel').where({ channelId });
    return channels.length > 0;
}

const registChannel = async (channelId: string): Promise<boolean> => {
    await knex<Channel>('channel').insert({ channelId });
    return true;
}

export { checkInChannel, registChannel };