const db = require("../models");
const User = db.user;

exports.editUser = async (req, res) => {
    res.send({message: "this is the edit user method"});
}

exports.getUser = async (req, res) => {
    res.send({message: "this is the get user method"});
}

exports.getUsers = async (req, res) => {
    res.send({message: "this is the get users method"});
}

exports.changePassword = async (req, res) => {
    res.send({message: "this is the change password method"});
}

exports.updateWorkoutPref = async (req, res) => {
    res.send({message: "this is the update workout preferences method"});
}

exports.getWorkouts = async (req, res) => {
    res.send({message: "this is the get workouts method"});
}

exports.getCreatedWorkouts = async (req, res) => {
    res.send({message: "this is the get created workouts method"});
}