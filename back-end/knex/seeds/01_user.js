exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("user")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("user").insert([
        {
          id: 1,
          username: "fedex",
          password: "abc123",
          name: "Roger",
          surname: "Federer",
          age: 39,
          description: "Swiss professional tennis player",
          gender: 1,
          profession: "Tennis",
        },
        {
          id: 2,
          username: "djoker",
          password: "abc123",
          name: "Novak",
          surname: "Djokovic",
          age: 33,
          description: "Serbian professional tennis player",
          gender: 1,
          profession: "Tennis",
        },
        {
          id: 3,
          username: "rafa",
          password: "abc123",
          name: "Rafael",
          surname: "Nadal",
          age: 34,
          description: "Spanish professional tennis player",
          gender: 1,
          profession: "Tennis",
        },
      ]);
    });
};
