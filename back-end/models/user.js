/* Mock Database */

let userArray = [
  { id: 1, name: "Marko", lastname: "Mlakar" },
  { id: 2, name: "Nika", lastname: "Maltar" },
  { id: 3, name: "Matija", lastname: "Mlakar" },
];

module.exports = {
  findAll: () =>
    new Promise((resolve) => {
      resolve(userArray);
    }),

  findById: (id) =>
    new Promise((resolve, reject) => {
      let user = userArray.find((user) => user.id == id);
      if (user == undefined) {
        reject("User does not exist");
      } else {
        resolve(user);
      }
    }),
  addUser: (body) =>
    new Promise((resolve, reject) => {
      if (!body.hasOwnProperty("name")) {
        reject("User object must have a property name");
      } else {
        let userId = userArray.length + 1;
        body["id"] = userId;
        userArray.push(body);
        resolve(userArray);
      }
    }),
  updateUser: (body) =>
    new Promise((resolve, reject) => {
      const userId = userArray.findIndex((user) => user.id == body.id);

      if (userId == -1) {
        reject("Can not update because the user does not exist");
      } else if (!body.hasOwnProperty("name")) {
        reject("User object must have a property name");
      } else {
        userArray[userId] = body;
        resolve(userArray);
      }
    }),
  deleteUser: (id) =>
    new Promise((resolve, reject) => {
      let userId = userArray.find((user) => user.id == id);
      if (userId == undefined) {
        reject("Can not delete because the user does not exist");
      } else {
        userArray = userArray.filter((user) => {
          return user.id != id;
        });
        resolve(userArray);
      }
    }),
};
