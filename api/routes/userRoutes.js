const express = require("express");
const userRoutes = express.Router();
const userController = require("../controllers/userController");

userRoutes.get("/login", userController.loginForm);
userRoutes.get("/signUp", userController.signUpForm);
userRoutes.get("/logout", userController.logout);
userRoutes.get("/auth/facebook", userController.authFacebook);
userRoutes.get("/auth/facebook/callback", userController.authFacebookCallback);
userRoutes.post("/login", userController.login);
userRoutes.post("/signUp", userController.signUp);

module.exports = userRoutes;