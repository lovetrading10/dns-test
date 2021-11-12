const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });

const { JWT_SECRET } = require("../util/base");

const auth = (req, res, next) => {
  const accessToken = req.header("access-token");

  console.log(accessToken);

  if (!accessToken) {
    return res.status(401).json({ error: "Access denied. No token provided" });
  }

  try {
    const data = jwt.verify(accessToken, JWT_SECRET);
    req.userId = data.userId;
    next();
  } catch (error) {
    res.status(400).json({ status: "failure", message: "invalid token" });
  }
};

module.exports = auth;
