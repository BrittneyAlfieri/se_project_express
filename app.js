const express = require("express");

const app = express();

const cors = require("cors");

const mongoose = require("mongoose");

const routes = require("./routes");

const { errors } = require("celebrate");

const { PORT = 3001 } = process.env;

mongoose.connect("mongodb://0.0.0.0:27017/wtwr_db");

const { errorHandler } = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");

app.use(cors());

app.use(express.json());

app.use(requestLogger);
app.use(routes);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {});
