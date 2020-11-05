let userArray = [
  { id: 1, name: "Marko", lastname: "Mlakar" },
  { id: 2, name: "Nika", lastname: "Maltar" },
  { id: 3, name: "Matija", lastname: "Mlakar" },
];

module.exports = {
  findAll: () => userArray,
  findById: (id) => {
    let user = userArray.find((user) => user.id == id);
    return user;
  },
  addUser: (body) => {
    let userId = userArray.length + 1;
    body["id"] = userId;
    userArray.push(body);
    return userArray;
  },
  updateUser: (body) => {
    let userId = userArray.findIndex((user) => user.id == body.id);
    userArray[userId] = body;
    return userArray;
  },
  deleteUser: (id) => {
    let res = userArray.filter((user) => {
      return user.id != id;
    });
    userArray = res;
    return res;
  },
};
