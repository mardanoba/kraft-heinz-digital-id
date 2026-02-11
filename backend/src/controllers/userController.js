// backend/src/controllers/userController.js
const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

exports.createUser = (req, res) => {
  const { full_name, passport_number, work_id } = req.body;
  const photo = req.file.filename;
  const access_token = uuidv4();

  const sql = `
    INSERT INTO users
    (full_name, passport_number, work_id, photo, access_token)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [full_name, passport_number, work_id, photo, access_token], (err) => {
    if (err) return res.status(500).json(err);

    res.json({
      message: "User created successfully",
      accessLink: `https://kraft-heinz-digital-id.vercel.app/welcome/${passport_number}`
    });
  });
};