const express = require("express");
const cors = require("cors");

const adminRoutes = require("./routes/adminRoutes"); // just the router
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);

module.exports = app;