const passport = require("passport")
const connectEnsureLogin = require("connect-ensure-login")

const db = require("../models");
const User = db.user;

exports.signUp = async (req, res) => {
    try {
        let checkUser = await User.find({username: req.body.username});
        if (checkUser.length) {
            res.status(500).send({error: "Account exists with provided username"});
        }
        let userObj = {
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            email: req.body.email,
            city: req.body.city,
            state: req.body.state,
            zipCode: req.body.zipCode,
            schoolYear: req.body.schoolYear,
            activities: req.body.activies,
            preferences: { // depends on format that front end sends request data
                activitiesExperience: req.body.activitiesExperience 
            },
            isAdmin: req.body.isAdmin
        }
        let user = new User(userObj);
        await user.save();
        let user_document = await User.findOne({username: req.body.username});
        let userID = user_document._id;
        console.log(userID);

        // in the request, req.body.availability will be an array of all sessions user is available, with
        // below as an example

        // let userAvailability = {
        //     user_id: userID,
        //     day: req.body.availability[i].day,
        //     time: {
        //         start: whatever given start time,
        //         end: whatever given end time,
        //     }
        // }
        res.send({message: "User successfully registered!"})

    } catch (err) {
        console.log(err);
        res.status(500).send({error: err.message})
    }
}

exports.signIn = async (req, res) => {
    try {
        let user = await User.findOne({username: req.body.username});
        if (!user) {
            res.status(401).send({error: "Username not found"});
        }
        const password = user.password;
        if (req.body.password !== password) {
            res.status(401).send({error: "Invalid password provided"});
        } else {
            let response = {
                message: "User signed in successfully",
                data: user
            }
            console.log(response)
            res.send(response);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({error: err.message});
    }
}

exports.forgotPassword = async (req, res) => {
    res.send({message: "This is the forgot password method"});
}

exports.deleteAccount = async (req, res) => {
    try {
        let user = await User.findOne({username: req.body.username});
        if (!user) {
            res.status(401).send({error: "Username not found"});
        }
        const password = user.password;
        if (req.body.password !== password) {
            res.status(401).send({error: "Invalid password provided"});
        } else {
            let response = await User.deleteOne({username: req.body.username});
            if (response.deletedCount === 1) {
                res.send({message: `User ${user.username} deleted successfully`, data: response});
            } else {
                console.log(response);
                res.status(500).send({message: "User was not successfully deleted"})
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({error: err.message});
    }
}