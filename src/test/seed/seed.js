const { ObjectID } = require("mongodb");
const { UserRoles } = require("../../libraries/constants");

const userOneID = new ObjectID();
const userTwoID = new ObjectID();
const users = [
  {
    _id: userOneID,
    name: {
      firstName: "",
      lastName: "",
    },
    email: "noorraza377@gmail.com",
    password: "hello",
    role: UserRoles.USER,
  },
  {
    _id: userTwoID,
    name: {
      firstName: "",
      lastName: "",
    },
    email: "admin@gmail.com",
    password: "hello",
    role: UserRoles.ADMIN,
  },
];
var populateUsers = (done) => {
  User.remove({})
    .then(() => {
      var userOne = new User(users[0]).save();
      var userTwo = new User(users[1]).save();

      return Promise.all([userOne, userTwo]);
    })
    .then(() => done());
};
module.exports = {
  users,
  populateUsers,
};
