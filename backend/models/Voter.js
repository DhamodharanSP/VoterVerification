const mongoose = require("mongoose");

const VoterSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  voter_id: String,
  address: String,
  booth_number: Number,
  nfcTag: String,
  nfcVerified: { type: Boolean, default: false },
  manualVerified: { type: Boolean, default: false },
});

module.exports = mongoose.model("voter", VoterSchema);
