require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const app = express();
const passport = require("passport");
require("./config/passport");

// MongoDB Connection
connectDB();

// Body Parser Setup
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));

// Cookie Parser Setup
app.use(cookieParser());

// PORT Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, process.env.IP, () => {
  console.log(`Server started on port ${PORT}`);
});

// Index Route
app.get("/", (req, res) => {
  res.status(200).json({
    msg: `Server is Connected and started on port ${PORT}`,
  });
});

// Routes
app.use("/admin/api", require("./routes/admins"));
app.use("/auth", require("./routes/auth"));
