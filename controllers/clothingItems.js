const ClothingItem = require("../models/clothingItem");
const { errorStatuses } = require("../utils/error");

const createItem = (req, res) => {
  const { name, weather, imageURL } = req.body;

  ClothingItem.create({ name, weather, imageURL })
    .then((item) => {
      res.status(200).send(item);
      console.log(req.user._id);
    })
    .catch((error) => {
      if(error.name === {$errorStatus})
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((error) => {
      res.status(500).send({ message: "Get items Failed", error });
    });
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageURL } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageURL } })
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((error) => {
      res.status(500).send({ message: "Error from updateItem", error });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  console.log(itemId);
  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(204).send({}))
    .catch((error) => {
      res.status(500).send({ message: "Error from deleteItem", error });
    });
};

// const likeItem = (req, res) => {

// }

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
};
