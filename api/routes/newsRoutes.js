const express = require("express");
const newsRoutes = express.Router();
const newsController = require("../controllers/newsController");

newsRoutes.get("/", newsController.get_all_articles);
newsRoutes.get("/:id", newsController.get_article_by_id);
newsRoutes.post("/", newsController.post_add_article);
newsRoutes.put("/:id", newsController.put_article);
newsRoutes.delete("/:id", newsController.delete_article);

module.exports = newsRoutes;
