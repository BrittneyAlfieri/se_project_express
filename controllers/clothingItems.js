const ClothingItem = require("../models/clothingItem");

const BadRequestError = require("../errors/bad-request-error");
const NotFoundError = require("../errors/not-found-error");
const ForbiddenError = require("../errors/forbidden-error");

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      res.status(201).send(item);
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        next(new BadRequestError("Invalid data provided"));
      } else {
        next(error);
      }
    });
};

const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((error) => {
      next(error);
    });
};

const updateItem = (req, res, next) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageUrl } })
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((error) => {
      if (error.name === "ValidationError" || error.name === "CastError") {
        next(new BadRequestError("Invalid data provided"));
      } else if (error.name === "DocumentNotFoundError") {
        next(new NotFoundError("Item not found"));
      } else {
        next(error);
      }
    });
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;
  const { _id: userId } = req.user;

  ClothingItem.findOne({ _id: itemId })
    .then((item) => {
      if (!item) {
        next(new NotFoundError("item not found"));
      }

      if (!item.owner.equals(userId)) {
        next(
          new ForbiddenError("Unauthorized: Only the card owner can delete it")
        );
      }

      return ClothingItem.deleteOne({ _id: itemId, owner: userId })
        .then(() => {
          res.status(200).send({ message: "Item deleted successfully" });
        })
        .catch((error) => {
          next(error);
        });
    })
    .catch((error) => {
      if (error.name === "CastError") {
        next(new BadRequestError("Invalid data provided"));
      }

      return next(error);
    });
};

const likeItem = (req, res, next) => {
  const { itemId } = req.params;
  const { _id: userId } = req.user;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: userId } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        next(new NotFoundError("Item not found"));
      } else {
        res.status(200).send({ data: item });
      }
    })
    .catch((error) => {
      if (error.name === "CastError") {
        next(new BadRequestError("Invalid data provided"));
      } else {
        next(error);
      }
    });
};

const dislikeItem = (req, res, next) => {
  const { itemId } = req.params;
  const { _id: userId } = req.user;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: userId } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        next(new NotFoundError("item not found"));
      } else {
        res.status(200).send({ data: item });
      }
    })
    .catch((error) => {
      if (error.name === "CastError") {
        next(new BadRequestError("Invalid data provided"));
      } else {
        next(error);
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
