const express = require("express");
const router = express.Router();

const userCotnroller = require("../controller/userController");

router.post("/auth/registration", userCotnroller.userRegistr);
router.post("/auth/login", userCotnroller.userLogin);
router.get("/auth", userCotnroller.userAuth);
router.get("/auth/google/callback", userCotnroller.userAuthCallback);
router.get(
  "/auth/google/callback/success",
  userCotnroller.userAuthCallbackSuccess
);

module.exports = router;
