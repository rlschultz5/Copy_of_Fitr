const mongoose = require('mongoose');

const UserWorkout = mongoose.model(
    "UserWorkout",
    new mongoose.Schema({
        user_ID: {
          type: mongoose.Schema.Types.ObjectID,
          ref: "User"
        },
        workout_ID: {
          type: mongoose.Schema.Types.ObjectID,
          ref: "Workout"
        }
    })
)

module.exports = UserWorkout;
