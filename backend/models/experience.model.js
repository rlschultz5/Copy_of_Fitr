const mongoose = require('mongoose');

const Experience = mongoose.model(
    "Experience",
    new mongoose.Schema({
        level: {type: String, unique: true}
    })
)

module.exports = Experience;