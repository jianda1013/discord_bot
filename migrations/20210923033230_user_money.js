
exports.up = function (knex) {
    return knex.schema.hasTable("money").then(exists => {
        if (!exists) {
            return knex.schema.createTable("money", function (table) {
                table.increments("id").unsigned();
                table.string("channel_id");
                table.string("user_id");
                table.integer("assets");
                table.timestamp("created_at").defaultTo(knex.fn.now());
            });
        }
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("money");
};
