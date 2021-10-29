const db = require("../models");
const User = db.user;
const Admin = db.admin;

exports.addAdmin = async (req, res) => {
    res.send({message: "this is the add admin method"});
}

exports.removeAdmin = async (req, res) => {
    res.send({message: "this is the remove admin method"});
}

exports.getAdmin = async (req, res) => {
    res.send({message: "this is the get admin method"});
}

exports.updateEmail = async (req, res) => {
    res.send({message: "this is the update admin email method"});
}