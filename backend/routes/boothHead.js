const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const BoothHead = require("../models/BoothHead");

// POST: Create a new Booth Head
router.post("/add", async (req, res) => {
  const {
    username,
    password,
    fullName,
    boothLocation,
    contactNumber,
    email,
    boothNumber, // <-- Added boothNumber here
  } = req.body;

  try {
    // Check if user already exists
    const existing = await BoothHead.findOne({ username });
    if (existing) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newBoothHead = new BoothHead({
      username,
      password: hashedPassword,
      fullName,
      boothLocation,
      contactNumber,
      email,
      boothNumber, // <-- Save boothNumber here
    });

    await newBoothHead.save();
    res.status(201).json({ message: "Booth head account created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
