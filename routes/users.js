const router = require("express").Router();

const { createUser, getUsers, getUser } = require("../controllers/users");

//CRUD

//CREATE
router.post("/", createUser);

//READ
router.get("/", getUsers);

//READ BY ID
router.get("/:userId", getUser);

module.exports = router;
