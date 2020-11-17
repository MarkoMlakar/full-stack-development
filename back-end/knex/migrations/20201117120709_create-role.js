/* Role table */
exports.up = function (knex, Promise) {
  return knex.schema.createTable("role", (table) => {
    table.increments("id").primary();
    table.string("user_role");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("role");
};
