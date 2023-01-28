require("./config/database").connect();
const express = require("express");
const passport = require("passport");
const cookie = require("cookie-session");
require("./config/passport");
require("dotenv").config();

const post = process.env.PORT;
const userRouter = require("./routes/userRouter");

const app = express();
app.use(express.json());
app.use(
  cookie({
    name: "google-auth-session",
    keys: ["key1", "key2"],
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", userRouter);

//---test----
app.get("/", (req, res) => {
  res.send(
    "Hi my lord : <button><a href='/auth'>Login With Google</a></button>"
  );
});

app.listen(post, () => {
  console.log(`Server start, port: ${post}`);
});
