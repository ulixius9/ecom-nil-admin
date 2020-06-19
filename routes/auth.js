const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const Customer = require("../models/Customer");
/* POST login. */
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  Customer.findOne({ email }, (err, user) => {
    if (err || !user) return res.status(400).json({ error: "User not found" });
    if (user.password != password)
      return res
        .status(400)
        .json({ error: "Email and Password does not match" });
    var token = jwt.sign({ _id: user._id }, process.env.SECRET);
    res.cookie("token", token, { expire: new Date() + 1 });
    const { _id, email, firstname, role } = user;
    res.json({ token, user: { _id, email, firstname, role } });
  });
});

module.exports = router;
