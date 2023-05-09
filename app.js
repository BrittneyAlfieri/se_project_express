const express = require("express");

const app = express();

const mongoose = require("mongoose");

const routes = require("./routes");

const { PORT = 3001 } = process.env;

mongoose.connect("mongodb://0.0.0.0:27017/wtwr_db");

app.use((req, res, next) => {
  req.user = {
    _id: "64557cecf39a49147ce3a83b",
  };
  next();
});

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {});
