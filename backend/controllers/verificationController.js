// backend/controllers/verificationController.js
const Voter = require('../models/Voter');

exports.verifyVoter = async (req, res) => {
  try {
    const { voterId } = req.body;
    
    // Find voter by NFC ID
    const voter = await Voter.findOne({ voterId });
    if (!voter) {
      return res.status(404).json({ 
        message: 'ID not verified', 
        status: 'not_found',
        verified: false
      });
    }

    // Check if already voted
    if (voter.hasVoted) {
      return res.status(200).json({ 
        message: 'Already voted', 
        status: 'already_voted',
        verified: false,
        voter: {
          name: voter.name,
          photo: voter.photo,
          voterId: voter.voterId
        }
      });
    }

    res.status(200).json({ 
      message: 'Verified, allow to vote', 
      status: 'verified',
      verified: true,
      voter: {
        name: voter.name,
        photo: voter.photo,
        address: voter.address,
        age: voter.age,
        gender: voter.gender,
        voterId: voter.voterId
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};  