exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("product")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("product").insert([
        {
          id: 1,
          title: "Product 1",
          description: "Admin Test product",
          price: "10",
          user_id: 1,
        },
        {
          id: 2,
          title: "Product 2",
          description: "User Test product",
          price: "50",
          user_id: 2,
        },
      ]);
    });
};
