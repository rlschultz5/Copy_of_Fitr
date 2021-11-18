const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const db = require("../models");
const User = db.user;

exports.signUp = async (req, res) => {
    try {
        passport.authenticate("signup", (err, user, info) => {
            if (err) {
                console.log(err);
                res.status(500).send({error: err.message});
            } else {
                if (!user){
                    res.status(401).send({message: info.message});
                } else {
                    res.send({message: info.message});
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
        passport.authenticate("signin", async (err, user, info) => {
            if (err) {
                console.log(err);
                res.status(500).send({error: err.message});
            } else {
                if (!user) {
                    res.status(401).send({message: info.message});
                } else {
                    req.login(user, (err) => {
                        const token = jwt.sign({username: user.username}, 'supersecretkey'); //temp key?
                        res.send({
                            message: info.message,
                            token: token,
                            data: user
                        })
                    })
                }
            }
        })(req, res)
    } catch (err) {
        console.log(err);
        res.status(500).send({error: err.message});
    }
}

exports.getProfile = async (req, res) => {
    try {
        passport.authenticate("jwtverify", {session: false}, async (err, user) => {
            if (err) {
                console.log(err);
                res.status(500).send({error: err.message});
            } else {
                res.send({user: user})
            }
        })(req, res)
    } catch (err) {
        console.log(err)
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
        const hashedPassword = user.password;
        const compare = await bcrypt.compare(req.body.password, hashedPassword)
        if (!compare) {
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