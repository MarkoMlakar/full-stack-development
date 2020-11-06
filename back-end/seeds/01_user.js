exports.seed = async (knex) => {
  const bcrypt = require("bcryptjs");
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash("root", salt);
  // Deletes ALL existing entries
  return knex("user")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("user").insert([
        {
          id: 1,
          username: "root",
          password: hashPassword,
          email: "root@gmail.com",
          name: "root_name",
          surname: "root_surname",
          age: 100,
          description: "Root description",
          gender: 1,
          profession: "IT",
        },
      ]);
    });
};
