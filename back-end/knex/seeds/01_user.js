exports.seed = async (knex) => {
  const bcrypt = require("bcryptjs");
  const salt = await bcrypt.genSalt(10);
  const hashPassword1 = await bcrypt.hash("root123", salt);
  const hashPassword2 = await bcrypt.hash("user123", salt);
  // Deletes ALL existing entries
  return knex("user")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("user").insert([
        {
          id: 1,
          username: "root",
          password: hashPassword1,
          email: "root@gmail.com",
          name: "root_name",
          surname: "root_surname",
          age: 100,
          description: "Root description",
          gender: 1,
          profession: "IT",
          role_id: 1,
        },
        {
          id: 2,
          username: "user",
          password: hashPassword2,
          email: "user@gmail.com",
          name: "user_name",
          surname: "user_surname",
          age: 50,
          description: "User view",
          gender: 1,
          profession: "IT",
          role_id: 2,
        },
      ]);
    });
};
