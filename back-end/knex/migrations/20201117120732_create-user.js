/* User table */
exports.up = function (knex, Promise) {
  return knex.schema.createTable("user", (table) => {
    table.increments("id").primary();
    table.string("username").unique().notNullable();
    table.string("email").unique().notNullable();
    table.string("password").notNullable();
    table.string("name").notNullable();
    table.string("surname").notNullable();
    table.string("description").notNullable();
    table.integer("age").notNullable();
    table.integer("gender").notNullable();
    table.string("profession").notNullable();
    table.integer("role_id").unsigned().references("id").inTable("role");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("user");
};
