const express = require("express");
const { register, login } = require("../controllers/authController");
//const { getAccessToRoute } = require("../middlewares/authMiddleware");

// api/auth
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;
