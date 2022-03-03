/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("sticker", function (table) {
        table.increments("id");
        table.string('channelId').references("channelId").inTable("channel").notNullable();
        table.string('command').notNullable();
        table.string('url');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists("sticker");
};
