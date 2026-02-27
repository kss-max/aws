const Announcement = require("../Models/Announcement");

// GET /api/announcements (Public)
const getAnnouncements = async (req, res) => {
    try {
        const announcements = await Announcement.find().sort({ date: -1 });
        res.json(announcements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST /api/admin/announcements (Admin only)
const createAnnouncement = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }

        const announcement = await Announcement.create({ title, content });
        res.status(201).json(announcement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE /api/admin/announcements/:id (Admin only)
const deleteAnnouncement = async (req, res) => {
    try {
        const announcement = await Announcement.findById(req.params.id);

        if (!announcement) {
            return res.status(404).json({ message: "Announcement not found" });
        }

        await announcement.deleteOne();
        res.json({ message: "Announcement removed" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAnnouncements, createAnnouncement, deleteAnnouncement };
