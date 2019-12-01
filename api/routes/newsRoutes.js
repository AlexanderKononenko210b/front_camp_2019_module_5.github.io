const express = require("express");
const newsRoutes = express.Router();
const newsController = require("../controllers/newsController");
const userService = require("../middleware/userSvc");

newsRoutes.get("/", newsController.getAll);
newsRoutes.get("/:id", newsController.getArticle);
newsRoutes.post("/", newsController.addArticle);
newsRoutes.put("/:id", userService.checkAuth, newsController.updateArticle);
newsRoutes.delete("/:id", userService.checkAuth, newsController.deleteArticle);

module.exports = newsRoutes;
