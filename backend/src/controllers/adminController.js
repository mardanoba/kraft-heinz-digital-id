// backend/src/controllers/adminController.js
const db = require("../config/db");
const path = require("path");
const fs = require("fs");

exports.addUser = (req, res) => {
  const { full_name, passport_id, work_id, work_type, sex } = req.body;
  const photo = req.file ? req.file.filename : null;

  if (!full_name || !passport_id || !work_id || !work_type || !sex) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = "INSERT INTO users (full_name, passport_id, work_id, work_type, sex, photo) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(sql, [full_name, passport_id, work_id, work_type, sex, photo], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Database insert failed" });
    }

    // Generate link for user
   const link = `https://kraft-heinz-digital-id.vercel.app/welcome`;
    res.status(201).json({ message: "User added successfully", link });
  });
};