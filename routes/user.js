const express = require("express");

const auth = require("../middleware/auth");
const userController = require("../controllers/user");

const router = express.Router();

// sign up
router.post("/signup", userController.signup);

// login
router.post("/login", userController.login);

// validate token
router.post("/validate", auth, userController.isValid);

module.exports = router;
