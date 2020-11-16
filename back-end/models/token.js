const knex = require("../knex/knex");
const bookshelf = require("bookshelf")(knex);

const Token = bookshelf.Model.extend({
  tableName: "token",
});

module.exports = Token;
