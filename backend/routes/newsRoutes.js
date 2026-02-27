const express = require("express");
const router = express.Router();
const {
    getAllNews,
    getNewsById,
    createNews,
    updateNews,
    deleteNews,
} = require("../Controllers/newsController");
const { protect, adminOnly } = require("../middlewares/authMiddleware");

// Public routes
router.get("/", getAllNews);
router.get("/:id", getNewsById);

// Admin protected routes
router.post("/", protect, adminOnly, createNews);
router.put("/:id", protect, adminOnly, updateNews);
router.delete("/:id", protect, adminOnly, deleteNews);

module.exports = router;
