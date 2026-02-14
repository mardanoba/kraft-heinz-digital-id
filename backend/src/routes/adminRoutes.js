// backend/src/routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const pool = require("../config/db");

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// -----------------
// Cloudinary storage setup
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "digital-id-users",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});
const upload = multer({ storage });

// -----------------
// Admin login (manual)
const admin = { username: "admin", password: "admin123" };

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === admin.username && password === admin.password) {
    return res.json({ token: "kraft-admin-token" });
  }
  res.status(401).json({ message: "Invalid credentials" });
});

// -----------------
// Add user (duplicates allowed, no passport_id in link)
router.post("/add-user", upload.single("photo"), async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token !== "kraft-admin-token")
    return res.status(401).json({ message: "Unauthorized" });

  try {
    const { full_name, passport_id, work_id, work_type, sex } = req.body;

    if (!full_name || !passport_id || !work_id || !work_type || !sex) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const photo = req.file ? req.file.path : null; // Cloudinary URL

    // ✅ Insert user and ignore duplicates by using ON DUPLICATE KEY UPDATE
    await pool.query(
      `INSERT INTO users (full_name, passport_id, work_id, work_type, sex, photo)
       VALUES (?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE 
         full_name = VALUES(full_name),
         work_type = VALUES(work_type),
         sex = VALUES(sex),
         photo = VALUES(photo)`,
      [full_name, passport_id, work_id, work_type, sex, photo]
    );

    // ✅ Generate welcome link WITHOUT passport_id
    const link = `https://kraft-heinz-digital-id.vercel.app/welcome`;
    res.status(201).json({ message: "User added successfully", link });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

// -----------------
// Update existing user photo
router.patch("/update-photo/:passport_id", upload.single("photo"), async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token !== "kraft-admin-token")
    return res.status(401).json({ message: "Unauthorized" });

  const passport_id = req.params.passport_id;

  if (!req.file) return res.status(400).json({ message: "No photo uploaded" });

  const photo = req.file.path; // Cloudinary URL

  try {
    const [existing] = await pool.query("SELECT * FROM users WHERE passport_id = ?", [passport_id]);
    if (!existing.length) return res.status(404).json({ message: "User not found" });

    await pool.query("UPDATE users SET photo = ? WHERE passport_id = ?", [photo, passport_id]);

    res.json({ message: "User photo updated successfully", photo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

// -----------------
// Fetch all users
router.get("/all", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

module.exports = router;