const knex = require("../knex/knex");
const bookshelf = require("bookshelf")(knex);

const User = bookshelf.Model.extend({
  tableName: "user",
});

module.exports = User;
