const router = require("express").Router();

const {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

router.post("/", createItem);

router.get("/", getItems);

router.put("/:itemId", updateItem);

router.put("/items/:itemId/likes", likeItem);

router.delete("/:itemId", deleteItem);

router.delete("/items/:itemId/likes", dislikeItem);

module.exports = router;
