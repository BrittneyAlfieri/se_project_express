const ClothingItem = require("../models/clothingItem");

const badRequestError = require("../errors/bad-request-error");
const notFoundError = require("../errors/not-found-error");
const forbiddenError = require("../errors/forbidden-error");

const {
  INVALID_DATA_ERROR,
  NOTFOUND_ERROR,
  DEFAULT_ERROR,
  FORBIDDEN_ERROR,
} = require("../utils/error");

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      res.status(201).send(item);
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        res.status(INVALID_DATA_ERROR.error);
        next(new badRequestError("Invalid data provided"));
      } else {
        res
          .status(DEFAULT_ERROR.error)
          .send({ message: "An error has occured on the server" });
      }
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch(() => {
      res
        .status(DEFAULT_ERROR.error)
        .send({ message: "An error has occured on the server" });
    });
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageUrl } })
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((error) => {
      if (error.name === "ValidationError" || error.name === "CastError") {
        res.status(INVALID_DATA_ERROR.error);
        next(new badRequestError("Invalid data provided"));
      } else if (error.name === "DocumentNotFoundError") {
        res.status(NOTFOUND_ERROR.error);
        next(new notFoundError("Item not found"));
      } else {
        res
          .status(DEFAULT_ERROR.error)
          .send({ message: "An error has occured on the server" });
      }
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  const { _id: userId } = req.user;

  ClothingItem.findOne({ _id: itemId })
    .then((item) => {
      if (!item) {
        res.status(NOTFOUND_ERROR.error);
        next(new notFoundError("item not found"));
      }

      if (!item.owner.equals(userId)) {
        res.status(FORBIDDEN_ERROR.error);
        next(
          new forbiddenError("Unauthorized: Only the card owner can delete it")
        );
      }

      return ClothingItem.deleteOne({ _id: itemId, owner: userId })
        .then(() => {
          res.status(200).send({ message: "Item deleted successfully" });
        })
        .catch(() => {
          res
            .status(DEFAULT_ERROR.error)
            .send({ message: "An error has occurred on the server" });
        });
    })
    .catch((error) => {
      if (error.name === "CastError") {
        res.status(INVALID_DATA_ERROR.error);
        next(new badRequestError("Invalid data provided"));
      }

      return res
        .status(DEFAULT_ERROR.error)
        .send({ message: "An error has occurred on the server" });
    });
};

const likeItem = (req, res) => {
  const { itemId } = req.params;
  const { _id: userId } = req.user;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: userId } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        res.status(NOTFOUND_ERROR.error);
        next(new notFoundError("Item not found"));
      } else {
        res.status(200).send({ data: item });
      }
    })
    .catch((error) => {
      if (error.name === "CastError") {
        res.status(INVALID_DATA_ERROR.error);
        next(new badRequestError("Invalid data provided"));
      } else {
        res
          .status(DEFAULT_ERROR.error)
          .send({ message: "An error has occured on the server" });
      }
    });
};

const dislikeItem = (req, res) => {
  const { itemId } = req.params;
  const { _id: userId } = req.user;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: userId } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        res.status(NOTFOUND_ERROR.error);
        next(new notFoundError("item not found"));
      } else {
        res.status(200).send({ data: item });
      }
    })
    .catch((error) => {
      if (error.name === "CastError") {
        res.status(INVALID_DATA_ERROR.error);
        next(new badRequestError("Invalid data provided"));
      } else {
        res
          .status(DEFAULT_ERROR.error)
          .send({ message: "An error has occured on the server" });
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
