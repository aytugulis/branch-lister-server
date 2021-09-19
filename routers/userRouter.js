const express = require("express");
const {
  getCurrentUser,
  getAllUsersAsAdmin,
} = require("../controllers/userController");
const {
  getAccessToRoute,
  getAdminAccess,
} = require("../middlewares/authMiddleware");

// api/user
const router = express.Router();

router.get("/get-current-user", [getAccessToRoute], getCurrentUser);
router.get(
  "/get-all-users-as-admin",
  [getAccessToRoute, getAdminAccess],
  getAllUsersAsAdmin
);

module.exports = router;
