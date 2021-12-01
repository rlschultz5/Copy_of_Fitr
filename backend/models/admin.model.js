const mongoose = require('mongoose');

const Admin = mongoose.model(
    "Admin",
    new mongoose.Schema({
        user_id: {
          type: mongoose.Schema.Types.ObjectID,
          ref: "User",
          unique: true,
          required: true
      },
        email: {type: String, unique: true, required: true}
    })
)

module.exports = Admin;
