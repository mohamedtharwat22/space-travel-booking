const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { Pool } = require("pg");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// 🚀 Get available trips
app.get("/trips", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM trips");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🚀 Book a trip
app.post("/book", async (req, res) => {
  const { user_id, trip_id, seat_class } = req.body;
  try {
    await pool.query(
      "INSERT INTO bookings (user_id, trip_id, seat_class) VALUES ($1, $2, $3)",
      [user_id, trip_id, seat_class]
    );
    res.json({ message: "Booking confirmed!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
