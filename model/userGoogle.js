const mg = require("mongoose");

const userSchema = new mg.Schema({
  email: { type: String, default: null },
  login: { type: String, default: null },
  name: { type: String, default: null },
  password: { type: String, default: null },
  locale: { type: String, default: null },
  date: { type: String, default: null },
  description: { type: String, default: null },
  token: { type: String },
});

module.exports = mg.model("userGoogle", userSchema);
