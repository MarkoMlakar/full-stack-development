exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("role")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("role").insert([
        { id: 1, user_role: "admin" },
        { id: 2, user_role: "user" },
      ]);
    });
};
