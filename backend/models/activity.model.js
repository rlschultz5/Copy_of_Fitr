const mongoose = require('mongoose');

const Activity = mongoose.model(
    "Activity", 
    new mongoose.Schema({
        name: String,
        userCount: Number
    })
)

module.exports = Activity;