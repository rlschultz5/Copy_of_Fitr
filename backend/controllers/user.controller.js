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
  if (!req.body.user_id){
    res.status(500).send({message: "No username submitted"});
  }

  try{
    let user_id = req.body.user_id
    let result = await User.findOne({_id: user_id});
    if (!result) {
      res.status(500).send({message: "No user found"});
    }
    console.log(result);
    res.send({data: result})
  } catch (err) {
    console.log(err);
    res.status(500).send({message: "An error has occured. Please check logs"})
  }
}

exports.getUsers = async (req, res) => {
  try {
    let result = await User.find({});
    console.log(result);
    res.send({data: result})
  } catch (err) {
    console.log(err);
    res.status(500).send({message: "An error has occured. Please check logs"})
  }
}

exports.changePassword = async (req, res) => {
    if (!req.body.user_id){
      throw "No user id was sent"
    }

    try {
      let user_id = req.body.user_id;
      let options = {new: true};
      let update = {
        password: req.body.password
      }
      let result = await User.findOneAndUpdate({_id: user_id}, update, options);
      console.log(result);
      res.send({message: "Password has been edited"})

    } catch (err) {
      console.log(err);
      res.status(500).send({message: "An error has occured. Please check logs"})
    }
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
    let result = await User.findOne({_id: req.body.user_id})
    console.log(result)
    res.send({data: result.createdWorkouts})
  } catch (err) {
    console.log(err)
    res.status(500).send({message: err})
  }
}

exports.getAttendingWorkouts = async (req, res) => {
  if (!req.body.user_id) {
    res.status(500).send({message: "No user_id was provided."})
  }

  try {
    let result = await User.findOne({_id: req.body.user_id})
    console.log(result)
    res.send({data: result.attendingWorkouts})
  } catch (err) {
    console.log(err)
    res.status(500).send({message: err})
  }
}

exports.joinWorkout = async (req, res) => {
  if (!req.body.user_id || !req.body.workout_id) {
    res.status(500).send({message: "No user_id or workout_id was provided."})
  }

  try{
    let retrieveUser = await User.findOne({_id: req.body.user_id})
    let retrieveWorkout = await Workout.findOne({_id: req.body.workout_id})
    const newWorkoutList = [...retrieveUser.attendingWorkouts, req.body.workout_id]
    const newMemberList = [...retrieveWorkout.membersAttending, req.body.user_id]

    let updateWorkout = {
      membersAttending: newMemberList
    }
    let updateUser = {
      attendingWorkouts: newWorkoutList
    }
    let options = {new: true}

    let foundUser = await User.findOneAndUpdate({_id: req.body.user_id}, updateUser, options);
    let foundWorkout = await Workout.findOneAndUpdate({_id: req.body.workout_id}, updateWorkout, options);

    console.log(foundUser)
    console.log(foundWorkout)
    res.status(200).send({message: "User has joined workout!"})
  } catch (err) {
    console.log(err)
    res.status(500).send({message: err})
  }
}
