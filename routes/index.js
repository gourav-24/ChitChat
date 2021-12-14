const express = require("express");
const router = express.Router();
const homeController = require("../controller/home_controller");
const imageController = require("../controller/image_controller");
console.log("index.js of routes loaded");

router.use("/users", require("./users"));
router.use("/post", require("./posts"));
router.use("/comment", require("./comment"));
router.use("/likes", require("./like"));
router.get("/image/:key", imageController.fetch);
router.get("/", homeController.home);

module.exports = router;
