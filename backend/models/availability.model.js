const mongoose = require('mongoose');

const Availability = mongoose.model(
    "Availability",
    new mongoose.Schema({
        user_id: {
            type: mongoose.Schema.Types.ObjectID,
            ref: "User",
            required: true
        },
        day: {type: String, required: true},
        availability: {type: Array, required: true}
    })
)