const { json } = require("body-parser");
const jwt = require("jsonwebtoken");

const tokenVerify = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (!token) return res.json("A token is required for authentication");
  try {
    const decod = jwt.verify(token, "TOKEN");
    req.user = decod;
  } catch (error) {
    return res.json("Invalid token");
  }
  return next();
};

module.exports = tokenVerify;
