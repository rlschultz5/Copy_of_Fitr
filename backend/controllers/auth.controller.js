const db = require("../models");
const User = db.user;

exports.signup = async (req, res) => {
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
            preferences: {
                activitiesExperience: req.body.activitiesExperience
            },
            isAdmin: req.body.isAdmin
        }
        let user = new User(userObj);
        await user.save();
        let user_document = await user.findOne({username: req.body.username});
        let userID = user_document._id;
        console.log(user_id);

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
    res.send({message: "This is the signup method"});
}

exports.signin = async (req, res) => {
    res.send({message: "This is the signin method"});
}

exports.forgotPassword = async (req, res) => {
    res.send({message: "This is the forgot password method"});
}

exports.deleteAccount = async (req, res) => {
    res.send({message: "This is the delete account method"});
}