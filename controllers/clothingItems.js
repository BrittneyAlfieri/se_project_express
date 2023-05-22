const ClothingItem = require("../models/clothingItem");
const {
  INVALID_DATA_ERROR,
  NOTFOUND_ERROR,
  DEFAULT_ERROR,
} = require("../utils/error");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      res.status(201).send(item);
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        res
          .status(INVALID_DATA_ERROR.error)
          .send({ message: "Invalid data provided" });
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
        res
          .status(INVALID_DATA_ERROR.error)
          .send({ message: "Invalid data provided" });
      } else if (error.name === "DocumentNotFoundError") {
        res.status(NOTFOUND_ERROR.error).send({ message: "Item not found" });
      } else {
        res
          .status(DEFAULT_ERROR.error)
          .send({ message: "An error has occured on the server" });
      }
    });
};

// const deleteItem = (req, res) => {
//   const { itemId } = req.params;
//   console.log(req.params);
//   const { _id: userId } = req.user;
//   console.log(req.user);

//   ClothingItem.findOne({ _id: itemId });
//   console.log({ _id: itemId });
//   console
//     .log({ owner: userId })
//     .then(itemId => {
//       if (!itemId) {
//         res.status(404).send({ message: "Item not found" });
//       } else {
//         ClothingItem.deleteOne({ _id: itemId, owner: userId })
//           .then(() => {
//             res.status(200).send({ data: item });
//           })
//           .catch((error) => {
//             res
//               .status(500)
//               .send({ message: "An error has occurred on the server" });
//           });
//       }
//     })
//     .catch((error) => {
//       if (error.name === "CastError") {
//         res.status(400).send({ message: "Invalid item ID" });
//       } else {
//         res
//           .status(500)
//           .send({ message: "An error has occurred on the server" });
//       }
//     });
// };

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  const { _id: userId } = req.user;

  ClothingItem.findOne({ _id: itemId, owner: userId }) // Find item with matching item ID and owner ID
    .then((item) => {
      if (!item) {
        res.status(404).send({ message: "Item not found" }); // Item not found, send 404 response
      } else {
        ClothingItem.deleteOne({ _id: itemId, owner: userId })
          .then(() => {
            res.status(200).send({ data: item }); // Item found and deleted, send 200 response
          })
          .catch((error) => {
            res
              .status(500)
              .send({ message: "An error has occurred on the server" });
          });
      }
    })
    .catch((error) => {
      if (error.name === "CastError") {
        res.status(400).send({ message: "Invalid item ID" }); // Invalid item ID, send 400 response
      } else {
        res
          .status(500)
          .send({ message: "An error has occurred on the server" });
      }
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
        res.status(NOTFOUND_ERROR.error).send({ message: "Item not found" });
      } else {
        res.status(200).send({ data: item });
      }
    })
    .catch((error) => {
      if (error.name === "CastError") {
        res
          .status(INVALID_DATA_ERROR.error)
          .send({ message: "Invalid item ID" });
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
        res.status(NOTFOUND_ERROR.error).send({ message: "Item not found" });
      } else {
        res.status(200).send({ data: item });
      }
    })
    .catch((error) => {
      if (error.name === "CastError") {
        res
          .status(INVALID_DATA_ERROR.error)
          .send({ message: "Invalid item ID" });
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
