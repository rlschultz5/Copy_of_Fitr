const db = require("../models");
const Workout = db.workout;

// gets workout by _id
exports.getWorkout = async (req, res) => {
    if (!req.query.id) {
        res.status(500).send({error: "No ID was sent"});
    }
    try {
        const data = await Workout.findOne({_id: req.query.id});
        console.log(data);
        if (!data) {
            res.status(500).send({error: "No workout by that ID found"});
        } else {
            res.send({data: data});
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({error: err.message})
    }
}

exports.editWorkout = async (req, res) => {
    if (!req.body.id) {
        res.status(500).send({error: "No ID was sent"});
    }
    try {
        const updateFields = req.body.update;
        const options = {new: true};
        const data = await Workout.findOneAndUpdate({_id: req.body.id}, updateFields, options);
        console.log(data);
        if (!data) {
            res.status(500).send({error: "No workout by that ID found"});
        } else {
            res.send({data: data});
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({error: err.message});
    }
    
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