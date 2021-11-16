const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  username: {type: String, unique : true, required : true},
  password: {type: String, required : true},
  name: String,
  email: {type: String, unique: true},
  city: String,
  state: String,
  zipCode: Number,
  schoolYear: {
    type: mongoose.Schema.Types.String,
    ref: "SchoolYear"
  },
  activities: Array,
  preferences: {
    activitiesExperience : Array,
    timeAvailability: {
      type: mongoose.Schema.Types.ObjectID,
      ref: "Availability"
    }
  },
  isAdmin: Boolean,
  createdWorkouts: [{
    type: mongoose.Schema.Types.ObjectID,
    ref: "Workout"
  }],
  attendingWorkouts: [{
    type: mongoose.Schema.Types.ObjectID,
    ref: "Workout"
  }]
})

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model(
  "User", userSchema
);

module.exports = User;
