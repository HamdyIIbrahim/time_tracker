const express = require("express");
const router = express.Router();
const HourTrackerMiddleware = require('../middleware/hourTracker');

router.get("/all-Tracks", HourTrackerMiddleware.getAllTracks);
router.put("/update-status",HourTrackerMiddleware.updateStatus)

module.exports = router;
