const express = require("express");
const router = express.Router();
const pool = require("../config/db");

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

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

// Login route
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === admin.username && password === admin.password) {
    return res.json({ token: "kraft-admin-token" });
  }
  res.status(401).json({ message: "Invalid credentials" });
});

// Add user
router.post("/add-user", upload.single("photo"), async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token !== "kraft-admin-token")
    return res.status(401).json({ message: "Unauthorized" });

  try {
    const { full_name, passport_id, work_id, work_type, sex } = req.body;

    const photo = req.file ? req.file.path : null; // IMPORTANT

    await pool.query(
      `INSERT INTO users (full_name, passport_id, work_id, work_type, sex, photo)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [full_name, passport_id, work_id, work_type, sex, photo]
    );

    const link = `https://kraft-heinz-digital-id.vercel.app/welcome/${passport_id}`;
    res.json({ message: "User added successfully", link });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

// Fetch all users
router.get("/all", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM users");
  res.json(rows);
});

module.exports = router;