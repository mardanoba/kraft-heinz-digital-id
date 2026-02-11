const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// Get user by passport ID
router.get("/passport/:passportId", async (req, res) => {
  try {
    const passportId = req.params.passportId;
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE passport_id = ?",
      [passportId]
    );

    if (rows.length === 0)
      return res.status(404).json({ message: "User not found" });

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

// Get user by work ID
router.get("/work/:workId", async (req, res) => {
  try {
    const workId = req.params.workId;
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE work_id = ?",
      [workId]
    );

    if (rows.length === 0)
      return res.status(404).json({ message: "User not found" });

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

module.exports = router;