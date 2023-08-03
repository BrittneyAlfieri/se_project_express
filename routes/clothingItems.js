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

router.post(
  "/",
  celebrate({ body: validateCardBody }),
  auth.handleAuthError,
  createItem
);

router.put(
  "/:itemId",
  auth.handleAuthError,
  celebrate({ body: validateItemID }),
  updateItem
);

router.put(
  "/:itemId/likes",
  celebrate({
    body: validateItemID,
  }),
  auth.handleAuthError,
  likeItem
);

router.delete(
  "/:itemId",
  celebrate({ body: validateItemID }),
  auth.handleAuthError,

  deleteItem
);

router.delete(
  "/:itemId/likes",
  celebrate({ body: validateItemID }),
  auth.handleAuthError,

  dislikeItem
);

module.exports = router;
