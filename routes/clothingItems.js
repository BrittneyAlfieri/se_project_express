const router = require("express").Router();
const { celebrate } = require("celebrate");
const auth = require("../middlewares/auth");

const {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

const {
  validateCardBody,
  validateItemID,
} = require("../middlewares/validation");

router.get("/", getItems);

router.post("/", auth.handleAuthError, celebrate(validateCardBody), createItem);

router.put(
  "/:itemId",
  auth.handleAuthError,
  celebrate(validateItemID),
  updateItem
);

router.put(
  "/:itemId/likes",
  auth.handleAuthError,
  celebrate(validateItemID),
  likeItem
);

router.delete(
  "/:itemId",
  auth.handleAuthError,
  celebrate(validateItemID),
  deleteItem
);

router.delete(
  "/:itemId/likes",
  auth.handleAuthError,
  celebrate(validateItemID),
  dislikeItem
);

module.exports = router;
