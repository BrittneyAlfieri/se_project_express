const router = require("express").Router();
const auth = require("../middlewares/auth");

const {
  getCurrentUser,
  updateUser,
  getUsers,
} = require("../controllers/users");

router.get("/me", getCurrentUser);

router.patch("/me", updateUser);

router.use(auth.handleAuthError);

router.get("/", getUsers);

module.exports = router;
