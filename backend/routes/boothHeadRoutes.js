const express = require("express")
const router = express.Router()
const BoothHead = require("../models/BoothHead")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// POST /api/booth-head/login
router.post("/login", async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await BoothHead.findOne({ username })
    if (!user) return res.status(401).json({ message: "Invalid credentials" })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" })

    const token = jwt.sign(
      { id: user._id, username: user.username, role: "boothhead" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    )

    res.json({
      id: user._id,
      username: user.username,
      role: "boothhead",
      token,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
