const express = require("express");
const router = express.Router();
const protect = require("../middleware/AuthMiddleware");
const {
  RequestSubmission,
  PendingRequests,
  ApproveRequests,
  AdminLogin,
} = require("../controllers/AdminController");
router.post("/approval-request", protect, RequestSubmission);

router.get("/pendingRequests", protect, PendingRequests);

router.put("/approveRequests/:id", protect, ApproveRequests);

router.post("/login", AdminLogin);

module.exports = router;
