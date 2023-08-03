const mongoose = require("mongoose");

const HourTrackerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
    fullTime: { type: Number },
    workFromHome: { type: Number },
    overTime: { type: Number },
    excelUrl: { type: String },
    date:{type:String},
    status: { type: String ,default:"pending"},
});

module.exports = mongoose.model("HourTracker", HourTrackerSchema);
