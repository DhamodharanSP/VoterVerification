// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const authRoutes = require('./routes/authRoutes');

// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cors());

// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('✅ MongoDB connected'))
//     .catch((err) => console.error('❌ MongoDB connection failed:', err));

// app.use('/api/auth', authRoutes);

// app.listen(process.env.PORT, () => {
//     console.log(`✅ Server running on port ${process.env.PORT}`);
// });





const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const dotenv = require("dotenv");
const boothHead = require("./routes/boothHead");
const boothHeadRoutes = require("./routes/boothHeadRoutes")
const superAdminRoutes = require("./routes/superAdmin");
const { Server } = require("socket.io");
const Voter = require("./models/Voter");

dotenv.config();
// const cors = require('cors');
// app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

const app = express();
app.use(cors());
app.use(express.json());


// const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes



// Route: Manual Approval
app.post("/manual-verify", async (req, res) => {
  const { voter_id } = req.body;

  if (!voter_id) {
    return res.status(400).json({ message: "❌ Missing voter ID." });
  }

  try {
    const voter = await Voter.findOne({ voter_id });

    if (!voter) {
      return res.status(404).json({ message: "❌ Voter not found." });
    }

    if (!voter.nfcVerified) {
      return res.status(403).json({ message: "⚠️ NFC verification not yet done." });
    }

    voter.manualVerified = true;
    await voter.save();

    console.log(`✅ Manual verification approved for ${voter.name}`);

    io.emit("manualVerified", {
      voter_id: voter.voter_id,
      name: voter.name,
      manualVerified: true,
    });

    return res.json({ success: true, message: `${voter.name} manually verified.` });
  } catch (error) {
    console.error("❌ Manual Verification Error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
});





app.get("/voters", async (req, res) => {
  try {
    const voters = await Voter.find();
    res.json(voters);
  } catch (error) {
    res.status(500).json({ message: "Error fetching voters." });
  }
});


app.get("/verify", async (req, res) => {
  const voters = await Voter.find({});
  // console.log(voters);
  let { tag } = req.query;
  console.log(tag)
  if (!tag) {
    return res.status(400).json({ message: "❌ Missing NFC tag in query." });
  }

  // Trim and log the tag to debug hidden characters
  tag = tag.trim();
  console.log(`📲 Scanned NFC Tag: [${tag}]`);

  try {
    const voter = await Voter.findOne({ nfcTag: tag });
      console.log(voter)
    if (!voter) {
      console.log("❌ Voter not found in database for tag:", tag);
      console.log(Voter.find())
      return res.status(404).json({ message: "❌ Voter not found with this tag." });
    }

    if (voter.nfcVerified) {
      console.log(`⚠️ Voter ${voter.name} already verified.`);
      io.emit("duplicateVoter", {
        message: `Voter ${voter.name} already verified.`,
      });

      return res.status(400).json({ message: "Voter already NFC verified." });
    }

    voter.nfcVerified = true;
    await voter.save();

    console.log(`✅ Voter ${voter.name} successfully verified.`);

    io.emit("voterVerified", {
      voter_id: voter.voter_id,
      name: voter.name,
      nfcVerified: true,
    });

    return res.json({
      success: true,
      message: `${voter.name} NFC verified successfully.`,
    });
  } catch (error) {
    console.error("❌ Verification Error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
});



app.use("/api/booth-head", boothHead);
app.use("/api/booth-head-routes", boothHeadRoutes);
app.use("/api/super-admin", superAdminRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

