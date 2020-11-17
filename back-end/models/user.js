const knex = require("../knex/knex");
const bookshelf = require("bookshelf")(knex);

const User = bookshelf.Model.extend({
  tableName: "user",
  product: function () {
    return this.hasMany(require("./product"));
  },
});

module.exports = User;
