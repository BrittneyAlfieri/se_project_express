const router = require("express").Router();

const auth = require("../middlewares/auth");

const { validateUserAvatar } = require("../middlewares/validation");

const { getCurrentUser, updateUser } = require("../controllers/users");

router.get("/me", auth.handleAuthError, getCurrentUser);

router.patch("/me", validateUserAvatar, auth.handleAuthError, updateUser);

module.exports = router;
