const mongoose = require('mongoose');

const UserWorkout = mongoose.model(
    "UserWorkout",
    new mongoose.Schema({
      //change this to an array of user_id's?
        user_id: {
          type: mongoose.Schema.Types.ObjectID,
          ref: "User"
        },
        workout_id: {
          type: mongoose.Schema.Types.ObjectID,
          ref: "Workout"
        }
    })
)

module.exports = UserWorkout;
