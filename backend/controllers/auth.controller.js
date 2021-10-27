const db = require("../models");
const User = db.user;

exports.signup = async (req, res) => {
    try {
        let checkUser = await User.find({username: req.query.username});
        if (checkUser.length) {
            res.status(500).send({error: "Account exists with provided username"});
        }
        let userObj = {
            username: req.query.username,
            password: req.query.password,
            name: req.query.name,
            email: req.query.email,
            city: req.query.city,
            state: req.query.state,
            zipCode: req.query.zipCode,
            schoolYear: req.query.schoolYear
        }

    } catch (err) {
        console.log(err);
        res.status(500).send({error: err.message})
    }
    res.send({message: "This is the signup method"});
}

exports.signin = async (req, res) => {
    res.send({message: "This is the signin method"});
}