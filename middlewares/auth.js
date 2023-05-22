const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

const handleAuthError = (req, res, next) => {
  console.log("middlewear executed");
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    console.log(authorization);
    console.log("unauthorized");
    return res.status(401).send({ message: "Unauthorized" });
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.log(err);
    if (err.name === "JsonWebTokenError") {
      return res.status(401).send({ message: "Invalid token" });
    } else if (err.name === "TokenExpiredError") {
      return res.status(401).send({ message: "Token expired" });
    } else {
      return res.status(400).send({ message: "Bad request" });
    }
  }

  req.user = payload;

  next();
};

module.exports = {
  handleAuthError,
};
