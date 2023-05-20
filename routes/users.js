const router = require("express").Router();
const auth = require("../middlewares/auth");

const {
  getCurrentUser,
  updateUser,
  getUsers,
} = require("../controllers/users");

router.get("/me", auth.handleAuthError, getCurrentUser);

router.patch("/me", auth.handleAuthError, updateUser);

router.get("/", getUsers);

module.exports = router;
