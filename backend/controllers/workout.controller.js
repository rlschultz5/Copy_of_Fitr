const db = require("../models");
const Workout = db.workout;
const User = db.user;

// gets workout by id
exports.getWorkout = async (req, res) => {
    if (!req.query.id) {
        res.status(500).send({error: "No ID was sent"});
    } else {
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
}

exports.editWorkout = async (req, res) => {
    if (!req.body.id) {
        res.status(500).send({error: "No ID was sent"});
    } else {
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

}

exports.deleteWorkout = async (req, res) => {
    if (!req.body.id) {
        res.status(500).send({error: "No ID was sent"});
    } else {
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
}

exports.createWorkout = async (req, res) => {
    if (!req.body.title || !req.body.activity || !req.body.minPeople || !req.body.experienceLevel || !req.body.length) {
        res.status(500).send({error: "Required fields missing"});
    } else {
        try {
            let isFull = (req.body.maxPeople == 1)
            const workoutObj = {
                title: req.body.title,
                activity: req.body.activity,
                location: req.body.location,
                minPeople: req.body.minPeople,
                maxPeople: req.body.maxPeople,
                date: req.body.date,
                experienceLevel: req.body.experienceLevel,
                length: req.body.length,
                creator_id: req.body.creator_id,
                memberCount: 1,
                membersAttending: req.body.membersAttending,
                isFull: isFull,
                description: req.body.description
            }
            const workout = await new Workout(workoutObj).save()
    
            let retrieveUser = await User.findOne({_id: req.body.creator_id})
            const newWorkoutList = [...retrieveUser.createdWorkouts, workout._id]
            let options = {new: true};
            let update = {
              createdWorkouts: newWorkoutList
            }
            const updateUserWorkouts = await User.findOneAndUpdate({_id: req.body.creator_id}, update, options);
            if (!updateUserWorkouts.createdWorkouts) {
                console.log("err when updating user workouts");
                return res.status(500).send({error: "Error occurred when creating workout"});
            }
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
    
}

exports.getActivity = async (req, res) => {
    if (!req.query.id) {
        res.status(500).send({error: "No ID was sent"});
    } else {
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
}

exports.getWorkouts = async (req, res) => {
    if (!req.body) {
        res.status(500).send({error: "No fields provided"});
    } else {
        console.log(req.body.fields);
        let fields = req.body.fields;
        if (fields["minPeople"]) fields["minPeople"] = {$gte: req.body.fields.minPeople};
        if (fields["maxPeople"]) fields["maxPeople"] = {$lte: req.body.fields.maxPeople};
        if (fields["date"]) {
            console.log(fields.date.substring(0, 10));
            const dateArray = fields.date.substring(0, 10).split('-');
            console.log(dateArray)
            fields["date"] = {$gte: new Date(parseInt(dateArray[0]), parseInt(dateArray[1]) - 1, parseInt(dateArray[2])),
                            $lt: new Date(parseInt(dateArray[0]), parseInt(dateArray[1]) - 1, parseInt(dateArray[2]) + 1)}
        }
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
}

exports.isFull = async (req, res) => {
    if (!req.query.id) {
        res.status(500).send({error: "ID not provided"});
    } else {
        try {
            const data = await Workout.findById({_id: req.query.id}).select('isFull');
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
}

exports.getAttendees = async (req, res) => {
    if (!req.query.id) {
        res.status(500).send({error: "No workout_id provided"});
    } else {
        try {
            const data = await Workout.findOne({_id: req.query.id});
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
}
