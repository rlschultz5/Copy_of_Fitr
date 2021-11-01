const db = require("../models");
const User = db.user;
const Workout = db.workout;
const UserWorkout = db.userWorkout;


exports.editUser = async (req, res) => {
  if (!req.body.username){
    throw "No username was sent."
  }

  try {
    let username = req.body.username;
    let options = {new: true};
    let update = {
      city: req.body.city,
      state: req.body.state,
      zipCode: req.body.zipCode,
      schoolYear: req.body.schoolYear,
      activities: req.body.activities
    }
    let result = await User.findOneAndUpdate({username: username}, update, options);
    console.log(result);
    res.send({message: "User has been edited"})

  } catch (err) {
    console.log(err);
    res.status(500).send({message: "An error has occured. Please check logs"})
  }
}

exports.getUser = async (req, res) => {
  if (!req.body.username){
    res.status(500).send({message: "No username submitted"});
  }

  try{
    let username = req.body.username
    let result = await User.findOne({username: username}).exec();
    console.log(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({message: "An error has occured. Please check logs"})
  }
}

exports.getUsers = async (req, res) => {
  try {
    let result = await User.find({});
    console.log(result);

  } catch (err) {
    console.log(err);
    res.status(500).send({message: "An error has occured. Please check logs"})
  }
}

exports.changePassword = async (req, res) => {
    res.send({message: "this is the change password method"});
}

exports.updateWorkoutPref = async (req, res) => {
  if (!req.body.preferences){
    throw "No username was sent."
  }

  try {
    let preferences = req.body.preferences;
    let options = {new: true};
    let result = await User.findOneAndUpdate({username: username}, {preferences: preferences}, options);
    console.log(result);
    res.send({message: "Preferences have been updated"})

  } catch (err) {
    console.log(err);
    res.status(500).send({message: "An error has occured. Please check logs"})
  }
}

exports.getWorkouts = async (req, res) => {
  if (!req.body.user_id) {
    res.status(500).send({message: "No user_id was provided."})
  }

  try {
    let result = await UserWorkout.find({user_id: req.body.user_id})
    console.log(result)
    res.send({data: result})
  } catch (err) {
    console.log(err)
    res.status(500).send({message: err})
  }
}


exports.getCreatedWorkouts = async (req, res) => {
  if (!req.body.user_id) {
    res.status(500).send({message: "No user_id was provided."})
  }

  try {
    let result = await Workout.find({user_id: req.body.user_id})
    console.log(result)
    res.send({data: result})
  } catch (err) {
    console.log(err)
    res.status(500).send({message: err})
  }
}
