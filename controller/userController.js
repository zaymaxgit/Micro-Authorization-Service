const User = require("../model/user");
const UserGoogle = require("../model/userGoogle");
const bcrypy = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

exports.userRegistr = async (req, res) => {
  try {
    const { login, password } = req.body;
    if (!(login && password)) res.json("All input is required");
    const oldUser = await User.findOne({ login });
    if (oldUser) {
      res.json("User Already Exist");
    } else {
      cryptPassword = await bcrypy.hash(password, 10);
      const newDate = new Date();
      const user = await User.create({
        login,
        password: cryptPassword,
        date: newDate.toDateString(),
      });
      const token = jwt.sign({ user_id: login }, process.env.TOKEN, {
        expiresIn: "2h",
      });
      user.token = token;
      res.json(user);
    }
  } catch (error) {
    console.log(error);
  }
};
exports.userLogin = async (req, res) => {
  try {
    const { login, password } = req.body;
    if (!(login && password)) res.json("All input is required");
    const user = await User.findOne({ login });
    const cryptPassword = await bcrypy.compare(password, user.password);
    if (user && cryptPassword) {
      const token = jwt.sign({ user_id: login }, process.env.TOKEN, {
        expiresIn: "2h",
      });
      user.token = token;
      res.json(user);
    }
  } catch (error) {
    console.log(error);
  }
};
exports.userAuth = passport.authenticate("google", {
  scope: ["email", "profile"],
});

exports.userAuthCallback = passport.authenticate("google", {
  successRedirect: "/auth/google/callback/success",
});

exports.userAuthCallbackSuccess = async (req, res) => {
  try {
    const email = req.user.email;
    const oldUser = await UserGoogle.findOne({ email });
    const token = jwt.sign(
      { user_id: req.user.displayName },
      process.env.TOKEN,
      {
        expiresIn: "2h",
      }
    );
    const newDate = new Date();
    if (!oldUser) {
      const userGoogle = await UserGoogle.create({
        email: req.user.email,
        login: req.user.displayName,
        locale: req.user._json.locale,
        date: newDate.toDateString(),
      });
      userGoogle.token = token;
      res.json(userGoogle);
    }
    if (oldUser) {
      oldUser.token = token;
      res.json(oldUser);
    }
  } catch (error) {
    console.log(error);
  }
};
