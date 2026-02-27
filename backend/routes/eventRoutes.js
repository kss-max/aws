const express = require("express");
const router = express.Router();
const { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent } = require("../Controllers/eventController");
const { protect, adminOnly } = require("../middlewares/authMiddleware");

// Public routes
router.get("/", getAllEvents);
router.get("/:id", getEventById);

// Admin protected routes
router.post("/", protect, adminOnly, createEvent);
router.put("/:id", protect, adminOnly, updateEvent);
router.delete("/:id", protect, adminOnly, deleteEvent);

module.exports = router;
