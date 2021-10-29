const db = require("../models");
const Workout = db.workout;

exports.getWorkout = async (req, res) => {
    res.send({message: "this is the get workout method"});
}

exports.editWorkout = async (req, res) => {
    res.send({message: "this is the edit workout method"});
}

exports.deleteWorkout = async (req, res) => {
    res.send({message: "this is the delete workout method"});
}

exports.createWorkout = async (req, res) => {
    res.send({message: "this is the add workout method"});
}

exports.getActivity = async (req, res) => {
    res.send({message: "this is the method to get the activity of a specific workout"});
}

exports.getParticipants = async (req, res) => {
    res.send({message: "this is the method to get the participants in a specific workout"});
}

exports.getWorkouts = async (req, res) => {
    res.send({message: "this is the method to get multiple workouts based on a field(s)"});
}

exports.isFull = async (req, res) => {
    res.send({message: "this is the method to see if a workout is full"});
}