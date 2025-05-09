const mongoose = require("mongoose")

const boothHeadSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hashed password
})

module.exports = mongoose.model("BoothHeadLogin", boothHeadSchema)
