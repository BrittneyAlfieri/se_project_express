const express = require("express");
const mongoose = require("mongoose");
const app = express();
mongoose.connect("mongodb://localhost:27017/wtwr_db");

const routes = require("./routes");
app.use(express.json());
app.use(routes);

const { PORT = 3001 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
