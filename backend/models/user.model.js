const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  username: {type: String, unique : true, required : true},
  password: {type: String, required : true},
  name: String,
  email: String,
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
  isAdmin: Boolean
})

userSchema.plugin(passportLocalMongoose);
userSchema.methods.validPassword = (password) => {
  return this.password === password;
}

const User = mongoose.model(
  "User", userSchema
);

module.exports = User;
