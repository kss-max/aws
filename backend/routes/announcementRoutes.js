const express = require("express");
const router = express.Router();
const { getAnnouncements, createAnnouncement, deleteAnnouncement } = require("../Controllers/announcementController");
const { protect, adminOnly } = require("../middlewares/authMiddleware");

// Public route to get all announcements
router.get("/", getAnnouncements);

// Admin only routes
router.post("/admin", protect, adminOnly, createAnnouncement);
router.delete("/admin/:id", protect, adminOnly, deleteAnnouncement);

module.exports = router;
