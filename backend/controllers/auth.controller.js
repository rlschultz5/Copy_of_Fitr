const passport = require("passport")

const db = require("../models");
const User = db.user;

exports.signUp = async (req, res) => {
    try {
        passport.authenticate("signup", (err, user) => {
            if (err) {
                console.log(err);
                res.status(500).send({error: err.message});
            } else {
                if (user){
                    res.status(401).send({message: "Account exists with provided username"});
                } else {
                    res.send({message: "New account successfully created"});
                }
            }
        })(req, res)
    } catch (err) {
        console.log(err);
        res.status(500).send({error: err.message})
    }
}

exports.signIn = async (req, res) => {
    try {
        passport.authenticate("signin", (err, user, info) => {
            if (err) {
                console.log(err);
                res.status(500).send({error: err.message});
            } else {
                if (!user) {
                    res.status(401).send({message: info.message});
                } else {
                    res.send({message: info.message})
                }
            }
        })
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