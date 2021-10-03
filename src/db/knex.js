const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        port: process.env.MYSQL_PORT,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        timezone: 'UTC',
        dateStrings: true
    }
})

module.exports = {
    knex,

    knexError(err, msg = undefined) {
        console.log(err)
        if (msg)
            msg.reply({ content: 'SQL_ERROR', ephemeral: true })
    }
}
