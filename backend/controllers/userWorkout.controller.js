const db = require("../models");
const UserWorkout = db.userWorkout;

exports.getParticipants = async (req, res) => {
  if (!req.body.workout_id){
    res.status(500).send({message: "No workout submitted"});
  }
  try{
    let workout_id = req.body.workout_id
    let result = await UserWorkout.findOne({workout_id: workout_id});
    if(!result){
      res.status(500).send({message: "No workout found"})
    }
    console.log(result)
    res.send({data: result.user_id})
  } catch (err) {
    console.log(err);
    res.status(500).send({message: "An error has occured. Please check logs"})
  }
}

exports.getUserWorkouts = async (req, res) => {
    res.send({message: "this is the get userWorkout method"});
}

//not working
exports.addUserWorkout = async (req, res) => {
    try{
      let userWorkout = await new UserWorkout({
        user_id: req.body.user_id,
        workout_id: req.body.workout_id
      })
      await userWorkout.save();
      console.log(userWorkout);
      res.send({message: "UserWorkout has been successfully added"})
    } catch (err) {
      console.log(err)
      res.status(500).send({message: "Error occurred. Please check logs"})
    }
}

exports.removeUserWorkout = async (req, res) => {
  if (!req.body.userworkout_id){
    throw "no userworkout id was given"
  }

  try{
    let userworkout_id = req.body.userworkout_id
    let result = await UserWorkout.deleteOne({_id: userworkout_id});
    if (!result) {
      res.status(500).send({message: "No userworkout found"});
    }
    console.log(result);
    res.send({data: result})
  } catch (err) {
    console.log(err);
    res.status(500).send({message: "Error occurred. Please check logs"});
  }
}
