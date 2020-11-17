const knex = require("../knex/knex");
const bookshelf = require("bookshelf")(knex);

const Role = bookshelf.Model.extend({
  tableName: "role",
});

module.exports = Role;
