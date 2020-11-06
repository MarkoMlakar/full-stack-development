const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    client: process.env.KNEX_CLIENT,
    connection: {
      host: process.env.KNEX_HOST,
      user: process.env.KNEX_USER,
      password: process.env.KNEX_PASSWORD,
      database: process.env.KNEX_DATABASE,
      charset: process.env.KNEX_CHARSET,
    },
  },
  /* TODO: Why is this not working? */
  migrations: {
    directory: __dirname + "/knex/migrations",
  },
  seeds: {
    directory: __dirname + "/knex/seeds",
  },
};