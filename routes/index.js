const router = require("express").Router();
const clothingItem = require("./clothingItems");
const user = require("./users");
const { createUser, login } = require("../controllers/users");
const auth = require("../middlewares/auth");
const NotFoundError = require("../errors/not-found-error");

const {
  validateUserBody,
  validateUserAuthentication,
} = require("../middlewares/validation");

router.use("/items", clothingItem);
router.use("/users", auth.handleAuthError, user);

router.get(`/crash-rest`, () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

router.post("/signup", validateUserBody, createUser);
router.post("/signin", validateUserAuthentication, login);

router.use(() => {
  throw new NotFoundError("NotFoundError");
});

module.exports = router;
