const mongoose = require('mongoose');

const WorkoutLength = mongoose.model(
    "WorkoutLength",
    new mongoose.Schema({
        length: {type: Number, required: true}
    })
)

module.exports = WorkoutLength;