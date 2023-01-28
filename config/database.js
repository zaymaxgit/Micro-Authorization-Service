require("dotenv").config();

const mg = require("mongoose");
const url = process.env.DB_CONN;

exports.connect = () => {
  mg.set("strictQuery", false);
  mg.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log("Connect database...");
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
};
