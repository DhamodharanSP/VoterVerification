const express = require("express");
const router = express.Router();
const Voter = require("../models/Voter");
const BoothHead = require("../models/BoothHead");

// GET: Dashboard Stats
router.get("/dashboard-stats", async (req, res) => {
  try {
    const totalVoters = await Voter.countDocuments({});
    const verifiedVotes = await Voter.countDocuments({ manualVerified: true });
    const rejectedVotes = 0; // Static value for now
    const multipleAttempts = 0; // Assuming we don’t have this field tracked yet
    const uniqueBooths = await Voter.distinct("booth_number");
    const boothHeads = uniqueBooths.length;

    const boothActivities = await Promise.all(
      uniqueBooths.map(async (booth) => {
        const verified = await Voter.countDocuments({
          booth_number: booth,
          manualVerified: true,
        });

        return {
          booth: `Booth ${booth}`,
          verified,
          rejected: 0, // Placeholder
          multipleAttempts: 0, // Placeholder
        };
      })
    );

    res.json({
      stats: {
        totalVoters,
        verifiedVotes,
        rejectedVotes,
        multipleAttempts,
        boothHeads,
      },
      boothActivities,
    });
  } catch (err) {
    console.error("Error fetching stats:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
