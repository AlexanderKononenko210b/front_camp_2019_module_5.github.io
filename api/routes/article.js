const express = require("express");
const router = express.Router();
const controller = require("../controllers/article");
const userService = require("../middleware/userSvc");

router.get("/", controller.getAll);
router.get("/:id", controller.getArticle);
router.post("/", controller.addArticle);
router.put("/:id", userService.checkAuth, controller.updateArticle);
router.delete("/:id", userService.checkAuth, controller.deleteArticle);

module.exports = router;
