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

router.get("/", getItems);

router.post("/", auth.handleAuthError, createItem);

router.put("/:itemId", auth.handleAuthError, updateItem);

router.put("/:itemId/likes", auth.handleAuthError, likeItem);

router.delete("/:itemId", auth.handleAuthError, deleteItem);

router.delete("/:itemId/likes", auth.handleAuthError, dislikeItem);

module.exports = router;
