
exports.up = function (knex) {
    return knex.schema.hasTable("channel").then(exists => {
        if (!exists) {
            return knex.schema.createTable("channel", function (table) {
                table.increments("id").unsigned();
                table.string("channel_id");
                table.string("register");
                table.timestamp("created_at").defaultTo(knex.fn.now());
            });
        }
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("channel");
};
