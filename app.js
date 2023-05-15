const express = require("express");

const app = express();

const mongoose = require("mongoose");

const routes = require("./routes");

const { PORT = 3001 } = process.env;

mongoose.connect("mongodb://0.0.0.0:27017/wtwr_db");


app.use(express.json());
app.use(routes);

app.listen(PORT, () => {});
