const router = require("express").Router();
const { celebrate } = require("celebrate");
const auth = require("../middlewares/auth");

const { validateUserAvatar } = require("../middlewares/validation");

const { getCurrentUser, updateUser } = require("../controllers/users");

router.get("/me", auth.handleAuthError, getCurrentUser);

router.patch(
  "/me",
  auth.handleAuthError,
  celebrate(validateUserAvatar),
  updateUser
);

module.exports = router;
