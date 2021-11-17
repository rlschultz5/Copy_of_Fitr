const db = require("../models");
const Workout = db.workout;

// gets workout by id
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
    if (!req.body.id) {
        res.status(500).send({error: "No ID was sent"});
    }
    try {
        const data = await Workout.deleteOne({_id: req.body.id})
        console.log(data);
        if (!data || data.deletedCount == 0) {
            res.status(500).send({error: "Workout not successfully deleted"});
        } else {
            res.send({message: "Successfully deleted", data: data});
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({error: err.message})
    }
}

exports.createWorkout = async (req, res) => {
    if (!req.body.title || !req.body.activity || !req.body.minPeople || !req.body.experienceLevel || !req.body.length) {
        res.status(500).send({error: "Required fields missing"});
    }
    try {
        let isFull = (req.body.maxPeople == 1)
        const workoutObj = {
            title: req.body.title,
            activity: req.body.activity,
            location: req.body.location,
            minPeople: req.body.minPeople,
            maxPeople: req.body.maxPeople,
            experienceLevel: req.body.experienceLevel,
            length: req.body.length,
            creator_id: req.body.creator_id,
            memberCount: 1,
            membersAttending: req.body.membersAttending,
            isFull: isFull,
            description: req.body.description
        }
        const workout = await new Workout(workoutObj).save()
        if (!workout) {
            console.log("err when saving");
            res.status(500).send({error: "Error occurred when creating workout"});
        } else {
            res.send({message: "Workout successfully created"})
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({error: err.message})
    }
}

exports.getActivity = async (req, res) => {
    if (!req.query.id) {
        res.status(500).send({error: "No ID was sent"});
    }
    try {
        const data = await Workout.findOne({_id: req.query.id}).select('activity');
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

exports.getWorkouts = async (req, res) => {
    if (!req.body) {
        res.status(500).send({error: "No fields provided"});
    }
    console.log(req.body.fields);
    let fields = req.body.fields;
    fields["minPeople"] = {$gte: req.body.fields.minPeople};
    fields["maxPeople"] = {$lte: req.body.fields.maxPeople};
    console.log(fields);

    try {
        const data = await Workout.find(req.body.fields);
        console.log(req.body.fields);
        if (data.length == 0) {
            res.status(500).send({error: "No matching workout found"});
        } else {
            res.send({data: data});
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({error: err.message});
    }
}

exports.isFull = async (req, res) => {
    if (!req.body.id) {
        res.status(500).send({error: "ID not provided"});
    }
    try {
        const data = await Workout.findById({_id: req.body.id}).select('isFull');
        console.log(data);
        if (!data) {
            res.status(500).send({error: "Provided workout not found"});
        }
        let response = {isFull: data.isFull};
        res.send(response);
    } catch (err) {
        console.log(err);
        res.status(500).send({error: err.message});
    }
}

exports.getAtendees = async (req, res) => {
    if (!req.body.workout_id) {
        res.status(500).send({error: "No workout_id provided"});
    }
    try {
        const data = await Workout.findOne({_id: req.body.workout_id});
        console.log(data);
        if (data.length == 0) {
            res.status(500).send({error: "No matching workout found"});
        } else {
            res.send({data: data.membersAttending});
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({error: err.message});
    }
}
