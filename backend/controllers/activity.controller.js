const db = require("../models");
const Activity = db.activity;

exports.getActivity = async (req, res) => {
    if (!req.body.activity_id){
      throw "no activity id was sent"
    }

    try{
      let activity_id = req.body.activity_id
      let result = await Activity.findOne({_id: activity_id});
      if (!result) {
        res.status(500).send({message: "No activity found"});
      }
      console.log(result);
      res.send({data: result})
    } catch (err) {
      console.log(err);
      res.status(500).send({message: "An error has occured. Please check logs"})
    }
}

exports.addActivity = async (req, res) => {
    try{
      let activity = await new Activity({
        name: req.body.name,
        userCount: req.body.userCount
      })
      await activity.save();
      console.log(activity);
      res.send({message: "Activity has been successfully submitted."})
    } catch (err) {
      console.log(err);
      res.status(500).send({message: "Error occurred. Please check logs"});
    }
}

exports.deleteActivity = async (req, res) => {
    if (!req.body.activity_id){
      throw "no activity id was given"
    }

    try{
      let activity_id = req.body.activity_id
      let result = await Activity.deleteOne({_id: activity_id});
      if (!result) {
        res.status(500).send({message: "No activity found"});
      }
      console.log(result);
      res.send({data: result})
    } catch (err) {
      console.log(err);
      res.status(500).send({message: "Error occurred. Please check logs"});
    }
}

exports.updateUserCount = async (req, res) => {
    if (!req.body.userCount){
      throw "No userCount was sent"
    }
    if (!req.body.activity_id){
      throw "No activity id was sent"
    }

    try {
      let options = {new: true};
      let result = await Activity.findOneAndUpdate({_id: req.body.activity_id}, {userCount: req.body.userCount}, options);
      console.log(result);
      res.send({message: "userCount has been updated"})
    } catch (err) {
      console.log(err);
      res.status(500).send({message: "An error has occured. Please check logs"})
    }
}
