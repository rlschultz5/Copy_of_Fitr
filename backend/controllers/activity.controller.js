const db = require("../models");
const Activity = db.activity;

exports.getActivity = async (req, res) => {
    if (!req.query.id){
      res.status(500).send({
        error: "No activity id was sent",
        query: req.query
      })
    } else {
      try {
        let id = req.query.id
        let result = await Activity.findOne({_id: id});
        if (!result) {
          return res.status(500).send({message: "No activity found"});
        }
        console.log(result);
        res.send({data: result})
      } catch (err) {
        console.log(err);
        res.status(500).send({message: "An error has occured. Please check logs"})
      }
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
    if (!req.body.id){
      res.status(500).send({
        error: "No activity id was sent",
        query: req.query
      })
    } else {
      try {
        let id = req.body.id
        let result = await Activity.deleteOne({_id: id});
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
}

exports.updateUserCount = async (req, res) => {
    try {
      if (!req.body.userCount){
        res.status(500).send({
          error: "No user count was sent",
          query: req.query
        })
      }
      if (!req.body.id){
        res.status(500).send({
          error: "No activity id was sent",
          query: req.query
        })
      }
      let options = {new: true};
      let result = await Activity.findOneAndUpdate({_id: req.body.id}, {userCount: req.body.userCount}, options);
      console.log(result);
      res.send({message: "userCount has been updated"})
    } catch (err) {
      console.log(err);
      res.status(500).send({message: "An error has occured. Please check logs"})
    }
}
