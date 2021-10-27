const mongoose = require('mongoose');

const db = {};

db.mongoose = mongoose;
db.workout = require("./workout.model");
db.activity = require("./activity.model");
db.experience = require("./experience.model");
db.workoutLength = require("./workoutLength.model");

module.exports = db;
