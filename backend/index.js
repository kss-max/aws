const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load env variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get("/", (req, res) => {
    res.json({ message: "API is running..." });
});


app.get("/api/events", (req, res) => {
  res.json([
    {
      id: 1,
      title: "Tech Fest",
      date: "2026-03-10",
      venue: "Main Auditorium"
    }
  ]);
});

// Routes (add your routes here later)
// app.use("/api/users", require("./routes/userRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
