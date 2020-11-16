/* Token table */
exports.up = function (knex, Promise) {
  return knex.schema.createTable("token", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().references("id").inTable("user");
    table.string("refresh_token");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("token");
};
