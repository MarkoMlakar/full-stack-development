/* Product table */
exports.up = function (knex, Promise) {
  return knex.schema.createTable("product", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.string("description").notNullable();
    table.string("price").notNullable();
    table.integer("user_id").unsigned().references("id").inTable("user");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("product");
};
