const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const corsMiddleware = require("./middlewares/corsMiddleware");

// Load env variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middlewares
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/register", require("./routes/registrationRoutes"));
app.use("/api/auth", require("./auth/authRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

// Base route
app.get("/", (req, res) => {
    res.json({ message: "API is running..." });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
