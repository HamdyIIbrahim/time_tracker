const HourTracker = require("../models/hourTracker");
exports.getAllTracks = async (req, res) => {
  try {
    const tracks = await HourTracker.find({}).populate("userId", "name email");
    if (tracks.length === 0) {
      res.status(200).json("no tracks found");
    } else {
      res.status(200).json(tracks);
    }
  } catch (err) {
    res.status(500).json({ err });
  }
};
exports.updateStatus = async (req, res) => {
  const { id, status } = req.body;
  HourTracker.findByIdAndUpdate(id, { status: status })
    .then(() => {
      res.status(200).json("status changed to " + status);
    })
    .catch((error) => {
      res.status(400).json(error.message);
    });
};
