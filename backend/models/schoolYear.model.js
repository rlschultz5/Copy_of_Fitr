const mongoose = require('mongoose');

const SchoolYear = mongoose.model(
    "SchoolYear",
    new mongoose.Schema({
        year: String
    })
);

module.exports = SchoolYear;