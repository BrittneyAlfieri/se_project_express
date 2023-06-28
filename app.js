const express = require("express");

const app = express();

const cors = require("cors");

const mongoose = require("mongoose");

const routes = require("./routes");

const { PORT = 3001 } = process.env;

mongoose.connect("mongodb://0.0.0.0:27017/wtwr_db");

const errorHandler = require("./middlewares/error-handler");

app.use(errorHandler);

app.use(cors());

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {});
