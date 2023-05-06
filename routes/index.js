const router = require("express").Router();
const clothingItem = require("./clothingItems");
const user = require("./users");

router.use("/items", clothingItem);
router.use("/users", user);

router.use((req, res) => {
  if (error.name === DEFAULT_ERROR.name) {
    res.status(DEFAULT_ERROR.error).send({ message: error.message });
  }
});

module.exports = router;
