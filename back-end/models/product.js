const knex = require("../knex/knex");
const bookshelf = require("bookshelf")(knex);

const Product = bookshelf.Model.extend({
  tableName: "product",
  user: function () {
    return this.belongsTo(User);
  },
});

module.exports = Product;
