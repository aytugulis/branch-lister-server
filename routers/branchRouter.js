const express = require("express");
const {
  createBranch,
  updateBranch,
  deleteBranch,
  getSingleBranch,
  getBranches,
} = require("../controllers/branchController");
const {
  getAccessToRoute,
  getAdminAccess,
} = require("../middlewares/authMiddleware");

// api/branch
const router = express.Router();

router.post("/", [getAccessToRoute, getAdminAccess], createBranch);
router.put("/:branchId", [getAccessToRoute, getAdminAccess], updateBranch);
router.delete("/:branchId", [getAccessToRoute, getAdminAccess], deleteBranch);
router.get("/:branchId", getSingleBranch);
router.get("/", getBranches);

module.exports = router;
