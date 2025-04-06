const mongoose = require("mongoose");

const BoothHeadSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  boothLocation: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  boothNumber: { type: Number, required: true }, // Added this line
});

module.exports = mongoose.model("BoothHead", BoothHeadSchema);
