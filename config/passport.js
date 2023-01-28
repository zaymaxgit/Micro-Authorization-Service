const psw = require("passport");
const pswGoogle = require("passport-google-oauth2").Strategy;
require("dotenv").config();

psw.serializeUser((user, done) => {
  done(null, user);
});
psw.deserializeUser(function (user, done) {
  done(null, user);
});

psw.use(
  new pswGoogle(
    {
      clientID: process.env.CLIENTID,
      clientSecret: process.env.CLIENTSECRET,
      callbackURL: process.env.CALLBACKURL,
      passReqToCallback: true,
    },

    function (req, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);
