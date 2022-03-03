import discord from 'discord.js';
import { Knex, knex } from 'knex';

const config: Knex.Config = {
    client: 'mysql',
    connection: {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT) : 3306,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        timezone: 'UTC',
        dateStrings: true
    },
};

const knexInstance = knex(config);

const knexError = (err: String, msg: discord.Message): void => {
    console.log(err);
    if (msg)
        msg.reply({ content: 'SQL_ERROR' });
}

export { knexInstance as knex, knexError };
