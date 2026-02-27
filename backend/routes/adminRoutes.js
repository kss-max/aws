const express = require("express");
const router = express.Router();
const { getAllRegistrations } = require("../Controllers/registrationController");
const { protect, adminOnly } = require("../middlewares/authMiddleware");

// GET /api/admin/registrations  (Admin only)
router.get("/registrations", protect, adminOnly, getAllRegistrations);

module.exports = router;
