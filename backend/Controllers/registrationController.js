const Registration = require("../Models/Registration");
const Event = require("../Models/Event");

// POST /api/register  (Public)
const registerForEvent = async (req, res) => {
    try {
        const { eventId, name, email, phone } = req.body;

        if (!eventId || !name || !email || !phone) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const event = await Event.findById(eventId);
        if (!event) return res.status(404).json({ message: "Event not found" });

        const existing = await Registration.findOne({ eventId, email });
        if (existing) {
            return res.status(400).json({ message: "Already registered for this event" });
        }

        const registration = await Registration.create({ eventId, name, email, phone });
        res.status(201).json({ message: "Registration successful", registration });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /api/admin/registrations  (Admin only)
const getAllRegistrations = async (req, res) => {
    try {
        const registrations = await Registration.find()
            .populate("eventId", "title date venue")
            .sort({ createdAt: -1 });
        res.json(registrations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerForEvent, getAllRegistrations };
