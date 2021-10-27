const mongoose = require('mongoose');

const db = {};
db.mongoose = mongoose;
db.user = require("./user.model");

db.SCHOOLYEAR = ["freshman", "sophomore", "junior", "senior", "graduate", "professor"]

module.exports = db;
