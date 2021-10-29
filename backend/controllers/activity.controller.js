const db = require("../models");
const Activity = db.activity;

exports.getActivity = async (req, res) => {
    res.send({message: "this is the get activity method"});
}

exports.addActivity = async (req, res) => {
    res.send({message: "this is the add activity method"});
}

exports.deleteActivity = async (req, res) => {
    res.send({message: "this is the delete activity method"});
}

exports.updateUserCount = async (req, res) => {
    res.send({message: "this is the update activity user count method"})
}