const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../utils/config");

const handleAuthError = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(403).send({ message: "Forbidden" });
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
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
