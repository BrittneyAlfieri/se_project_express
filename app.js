const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose
  .connect("mongodb://0.0.0.0:27017/wtwr_db")
  .then(() => {
    console.log(`successfully connected`);
  })
  .catch((e) => {
    console.log({ e: { message: e.message } });
  });

app.use((req, res, next) => {
  req.user = {
    _id: "64557cecf39a49147ce3a83b",
  };
  next();
});

const routes = require("./routes");
app.use(express.json());
app.use(routes);

const { PORT = 3001 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
