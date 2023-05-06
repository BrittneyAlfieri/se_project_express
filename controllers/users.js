const User = require("../models/user");

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((error) => {
      res.status(500).send({ message: "Error with createUser", error });
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((error) => {
      res.status(500).send({ message: "Error with getUser", error });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => res.status(200).send(user))
    .catch((error) => {
      res.status(500).send({ message: "Error with getUserId", error });
    });
};

module.exports = {
  createUser,
  getUsers,
  getUser,
};
