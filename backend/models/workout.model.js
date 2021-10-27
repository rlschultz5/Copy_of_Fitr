const mongoose = require("mongoose");

const Workout = mongoose.model(
    "Workout", 
    new mongoose.Schema({
        title: String,
        activity: {
            type: mongoose.Schema.Types.String,
            ref: "Activity"
        },
        location: String,
        minPeople: {type: Number, required: true},
        maxPeople: {type: Number, required: true},
        date: Date,
        experienceLevel: {
            type: mongoose.Schema.Types.String,
            ref: "Experience"
        },
        length: {
            type: mongoose.Schema.Types.Number,
            ref: "WorkoutLength"
        },
        creator: String // will update to User ref once user model created
    })
);

module.exports = Workout;