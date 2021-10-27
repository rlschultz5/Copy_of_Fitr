const mongoose = require('mongoose');

const WorkoutLength = mongoose.model(
    "WorkoutLength",
    new mongoose.Schema({
        length: Number
    })
)

module.exports = WorkoutLength;