const db = require("../models");
const UserWorkout = db.userWorkout;

exports.getParticipants = async (req, res) => {
    res.send({message: "this is the get workout participants method"});
}

exports.getUserWorkouts = async (req, res) => {
    res.send({message: "this is the get userWorkout method"});
}

exports.addUserWorkout = async (req, res) => {
    res.send({message: "this is the add userWorkout method"});
}

exports.removeUserWorkout = async (req, res) => {
    res.send({message: "this is the remove userWorkout method"});
}