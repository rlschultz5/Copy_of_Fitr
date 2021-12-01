const mongoose = require('mongoose');

const SchoolYear = mongoose.model(
    "SchoolYear",
    new mongoose.Schema({
        year: {type: String, unique: true}
    })
);

module.exports = SchoolYear;