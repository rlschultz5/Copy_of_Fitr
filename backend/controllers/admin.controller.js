const db = require("../models");
const User = db.user;
const Admin = db.admin;

exports.addAdmin = async (req, res) => {
  if (!req.body.user_id){
    throw "No user id was sent"
  }

  try {
    let user_id = req.body.user_id;
    let options = {new: true};
    let update = {
      isAdmin: True
    }
    let result = await User.findOneAndUpdate({_id: user_id}, update, options);
    let admin = await new Admin({
      user_id: user_id,
      email: result.email
    })
    await admin.save();
    console.log(result);
    console.log(admin);
    res.send({message: "Admin status has been updated"})

  } catch (err) {
    console.log(err);
    res.status(500).send({message: "An error has occured. Please check logs"})
  }
}

exports.removeAdmin = async (req, res) => {
  if (!req.body.user_id){
    throw "No user id was sent"
  }

  try {
    let user_id = req.body.user_id;
    let options = {new: true};
    let update = {
      isAdmin: False
    }
    let result = await User.findOneAndUpdate({_id: user_id}, update, options);
    let delete_admin = await Admin.deleteOne({user_id: user_id});
    console.log(result);
    console.log(delete_admin);
    res.send({message: "Admin status has been updated"})

  } catch (err) {
    console.log(err);
    res.status(500).send({message: "An error has occured. Please check logs"})
  }
}

exports.getAdmin = async (req, res) => {
  if (!req.body.admin_id){
    res.status(500).send({message: "No admin id submitted"});
  }

  try{
    let result = await User.findOne({_id: admin_id});
    if (!result) {
      res.status(500).send({message: "No admin found"});
    }
    console.log(result);
    res.send({data: result})
  } catch (err) {
    console.log(err);
    res.status(500).send({message: "An error has occured. Please check logs"})
  }
}

exports.updateEmail = async (req, res) => {
  if (!req.body.admin_id){
    throw "No admin id was sent"
  }

  try {
    let admin_id = req.body.admin_id;
    let options = {new: true};
    let update = {
      email: req.body.email
    }
    let result = await Admin.findOneAndUpdate({_id: admin_id}, update, options);
    console.log(result);
    res.send({message: "Email has been updated"})

  } catch (err) {
    console.log(err);
    res.status(500).send({message: "An error has occured. Please check logs"})
  }
}
