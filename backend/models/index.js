const mongoose = require('mongoose');

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.schoolYear = require("./schoolYear.model")
db.workout = require("./workout.model");
db.activity = require("./activity.model");
db.experience = require("./experience.model");
db.workoutLength = require("./workoutLength.model");
db.admin = require("./admin.model");
db.availability = require("./availability.model");
db.userWorkout = require("./userWorkout.model");

module.exports = db;
