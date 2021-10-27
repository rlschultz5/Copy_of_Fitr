const mongoose = require('mongoose');

const Experience = mongoose.model(
    "Experience",
    new mongoose.Schema({
        level: String
    })
)

module.exports = Experience;