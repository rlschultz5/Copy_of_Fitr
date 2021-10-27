const mongoose = require('mongoose');

const Admin = mongoose.model(
    "Admin",
    new mongoose.Schema({
        user_ID: {
          type: mongoose.Schema.Types.ObjectID,
          ref: "User"
      },
        email: String
    })
)

module.exports = Admin;
