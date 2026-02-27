const News = require("../Models/News");

// GET /api/news  (Public)
const getAllNews = async (req, res) => {
    try {
        const news = await News.find()
            .populate("publishedBy", "name email")
            .populate("eventId", "title date")
            .sort({ createdAt: -1 });
        res.json(news);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /api/news/:id  (Public)
const getNewsById = async (req, res) => {
    try {
        const news = await News.findById(req.params.id)
            .populate("publishedBy", "name email")
            .populate("eventId", "title date venue");
        if (!news) return res.status(404).json({ message: "News not found" });
        res.json(news);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST /api/news  (Admin only)
const createNews = async (req, res) => {
    try {
        const { title, content, image, eventId } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }

        const news = await News.create({
            title,
            content,
            image,
            eventId: eventId || null,
            publishedBy: req.user._id,
        });

        res.status(201).json({ success: true, data: news });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// PUT /api/news/:id  (Admin only)
const updateNews = async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) return res.status(404).json({ message: "News not found" });

        const updated = await News.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.json({ success: true, data: updated });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// DELETE /api/news/:id  (Admin only)
const deleteNews = async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) return res.status(404).json({ message: "News not found" });

        await News.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "News deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { getAllNews, getNewsById, createNews, updateNews, deleteNews };
