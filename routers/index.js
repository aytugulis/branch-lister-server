const express = require("express");
const auth = require("./authRouter");
const user = require("./userRouter");
const branch = require("./branchRouter");

// /api
const router = express.Router();

router.use("/auth", auth);
router.use("/user", user);
router.use("/branch", branch);

module.exports = router;
