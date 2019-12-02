const express = require("express");
const router = express.Router();
const controller = require("../controllers/user");

router.get("/login", controller.loginForm);
router.get("/signUp", controller.signUpForm);
router.get("/logout", controller.logout);
router.get("/auth/facebook", controller.authFacebook);
router.get("/auth/facebook/callback", controller.authFacebookCallback);
router.post("/login", controller.login);
router.post("/signUp", controller.signUp);

module.exports = router;