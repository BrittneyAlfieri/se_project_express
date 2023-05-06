const User = require("../models/user");

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((error) => {
      if (
        error.name === INVALID_DATA_ERROR.name ||
        error.name === NOTFOUND_ERROR.name
      ) {
        res
          .status(INVALID_DATA_ERROR.error || NOTFOUND_ERROR.error)
          .send({ message: error.message });
      } else {
        res.status(DEFAULT_ERROR.error).send({ message: error.message });
      }
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((error) => {
      if (
        error.name === INVALID_DATA_ERROR.name ||
        error.name === NOTFOUND_ERROR.name
      ) {
        res
          .status(INVALID_DATA_ERROR.error || NOTFOUND_ERROR.error)
          .send({ message: error.message });
      } else {
        res.status(DEFAULT_ERROR.error).send({ message: error.message });
      }
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => res.status(200).send(user))
    .catch((error) => {
      if (error.name === DEFAULT_ERROR.name) {
        res.status(DEFAULT_ERROR.error).send({ message: error.message });
      }
    });
};

module.exports = {
  createUser,
  getUsers,
  getUser,
};
