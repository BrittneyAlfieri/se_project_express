const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose
  .connect("mongodb://localhost:27017/wtwr_db")
  .then(() => {
    console.log(`successfully connected`);
  })
  .catch((e) => {
    console.log(e);
    console.log("not connected");
  });

const routes = require("./routes");
app.use(express.json());
app.use(routes);

const { PORT = 3001 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
