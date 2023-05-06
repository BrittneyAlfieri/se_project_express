const ClothingItem = require("../models/clothingItem");
const {
  INVALID_DATA_ERROR,
  NOTFOUND_ERROR,
  DEFAULT_ERROR,
} = require("../utils/error");

const createItem = (req, res) => {
  const { name, weather, imageURL } = req.body;

  ClothingItem.create({ name, weather, imageURL })
    .then((item) => {
      res.status(200).send(item);
      console.log(req.user._id);
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

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((error) => {
      if (error.name === DEFAULT_ERROR.name) {
        res.status(DEFAULT_ERROR.error).send({ message: error.message });
      }
    });
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageURL } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageURL } })
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
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

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  console.log(itemId);
  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(204).send({}))
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

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
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

const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
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

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeItem,
  dislikeItem,
};
