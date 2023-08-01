const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { errors } = require("celebrate");
require("dotenv").config();

const { errorHandler } = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const routes = require("./routes");

const app = express();

const { PORT = 3001 } = process.env;

mongoose.connect("mongodb://0.0.0.0:27017/wtwr_db");

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
