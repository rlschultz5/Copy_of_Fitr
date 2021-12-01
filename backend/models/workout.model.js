const mongoose = require("mongoose");

const Workout = mongoose.model(
    "Workout",
    new mongoose.Schema({
        title: {type: String, required: true},
        activity: {
            type: mongoose.Schema.Types.String,
            ref: "Activity",
            required: true
        },
        description: String,
        location: String,
        minPeople: {type: Number, required: true},
        maxPeople: {type: Number},
        date: {type: Date, require: true},
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
        creator_id: {
            type: mongoose.Schema.Types.ObjectID,
            ref: "User"
        },
        membersAttending: [{
            type: mongoose.Schema.Types.ObjectID,
            ref: "User"
        }],
        memberCount: Number,
        isFull: Boolean
    })
);

module.exports = Workout;
