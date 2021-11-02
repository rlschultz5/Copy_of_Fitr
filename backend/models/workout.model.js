const mongoose = require("mongoose");

const Workout = mongoose.model(
    "Workout",
    new mongoose.Schema({
        title: String,
        activity: {
            type: mongoose.Schema.Types.String,
            ref: "Activity",
            required: true
        },
        location: String,
        minPeople: {type: Number, required: true},
        maxPeople: {type: Number},
        date: Date,
        experienceLevel: {
            type: mongoose.Schema.Types.String,
            ref: "Experience",
            required: true
        },
        length: {
            type: mongoose.Schema.Types.Number,
            ref: "WorkoutLength",
            required: true
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectID,
            ref: "User"
        }
    })
);

module.exports = Workout;
