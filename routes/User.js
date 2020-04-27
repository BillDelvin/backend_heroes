const express = require("express");
const router = express.Router();
const userController = require("../controllers/User");

router.post("/register", userController.create);
router.post("/login", userController.authentication);
// router.get("/get", userController.getUserData);
// router.get("/get/:userId", userController.getUserDataById);

module.exports = router;
