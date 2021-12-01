const mongoose = require('mongoose');

const WorkoutLength = mongoose.model(
    "WorkoutLength",
    new mongoose.Schema({
        length: {type: Number, required: true, unique: true}
    })
)

module.exports = WorkoutLength;