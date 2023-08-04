const router = require("express").Router();

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

router.post("/", validateCardBody, auth.handleAuthError, createItem);

router.put("/:itemId", validateItemID, auth.handleAuthError, updateItem);

router.put("/:itemId/likes", validateItemID, auth.handleAuthError, likeItem);

router.delete("/:itemId", validateItemID, auth.handleAuthError, deleteItem);

router.delete(
  "/:itemId/likes",
  validateItemID,
  auth.handleAuthError,
  dislikeItem
);

module.exports = router;
