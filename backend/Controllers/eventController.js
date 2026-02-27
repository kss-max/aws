const Event = require("../Models/Event");

// GET /api/events  (Public)
const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find().sort({ date: 1 });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /api/events/:id  (Public)
const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: "Event not found" });
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST /api/events  (Admin only)
const createEvent = async (req, res) => {
    try {
        const { title, description, date, venue, location, organizer } = req.body;

        if (!title || !description || !date || !venue) {
            return res.status(400).json({ message: "title, description, date, and venue are required" });
        }

        const event = await Event.create({ title, description, date, venue, location, organizer });
        res.status(201).json({ success: true, data: event });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// PUT /api/events/:id  (Admin only)
const updateEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: "Event not found" });

        const updated = await Event.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.json({ success: true, data: updated });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// DELETE /api/events/:id  (Admin only)
const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: "Event not found" });

        await Event.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent };
