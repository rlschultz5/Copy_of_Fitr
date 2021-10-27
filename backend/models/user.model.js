const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: {type: String, unique : true, required : true},
    password: {type: String, required : true},
    name: String,
    email: String,
    city: String,
    state: String,
    zipCode: Number,
    schoolYear: {
      type: mongoose.Schema.Types.String,
      ref: "SCHOOLYEAR"
    },
    activities: Array,
    //preferences: userPreferences,
    isAdmin: Boolean
  })
);

module.exports = User;
