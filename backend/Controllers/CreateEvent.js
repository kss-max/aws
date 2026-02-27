const Event = require('../Models/Event');

const createEvent = async (req, res) => {
    try {
        const { title, description, date, location, organizer } = req.body;

        const newEvent = new Event({
            title,
            description,
            date,
            location,
            organizer
        });

        const savedEvent = await newEvent.save();
        res.status(201).json({ success: true, data: savedEvent });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = createEvent;
