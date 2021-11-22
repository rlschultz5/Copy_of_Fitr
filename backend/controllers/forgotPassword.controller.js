const crypto = require("crypto");
const bcrypt = require('bcrypt');
const passwordGenerator = require("generate-password");
const sendEmail = require("../utils/sendEmail");

const emailConfig = require("../config/email.config")
const db = require("../models");
const Token = require("../models/token.model");
const User = db.user;

exports.forgotPassword = async (req, res) => {
    try {
        if (!req.body.username) {
            res.status(401).send({error: "No username provided"});
        }
        const doc = await User.findOne({username: req.body.username});
        if (!doc) {
            res.status(401).send({error: "Username not found"});
        } else {

            let tokenDoc = await Token.findOne({ userId: doc._id });
            if (!tokenDoc) {
                tokenDoc = await new Token({
                    userId: doc._id,
                    token: crypto.randomBytes(32).toString("hex"),
                }).save();
            }

            const tempPassword = passwordGenerator.generate({
                length: 20,
                numbers: true
            })
            doc.password = await bcrypt.hash(tempPassword, 10);
            await doc.save();
            console.log(tempPassword)
            const message = "Here is your temporary password: " + tempPassword;
            const email = doc.email;
            console.log(tokenDoc);
            if (!email) {
                res.status(500).send({error: "No email found for user"})
            } else {
                await sendEmail(doc.email, "Password reset", message);
                res.send({message: "new temporary password sent to provided email", forgotPasswordToken: tokenDoc.token});
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({error: err.message})
    }
}

// temporary reset password method that does not verify user token
exports.resetPasswordTemp = async (req, res) => {
    try {
        if (!req.body.password) {
            res.status(401).send({error: "No password provided"});
        }
        const doc = await User.findById(req.body.userId);
        if (!doc) {
            return res.status(401).send({error: "incorrect user id, user not found"});
        }
        const password = req.body.password;
        const newHashedPassword = await bcrypt.hash(password, 10);
        doc.password = newHashedPassword;
        await doc.save();
        res.send({message: "password successfully reset"});
    } catch (err) {
        console.log(err);
        res.status(500).send({message: "An error occurred, check logs"});
    }
}

exports.resetPassword = async (req, res) => {
    try {
        if (!req.body.password) {
            res.status(401).send({error: "No password provided"});
        }
        const doc = await User.findById(req.body.userId);
        if (!doc) {
            return res.status(401).send({error: "incorrect user id, user not found"});
        }
        const token = await Token.findOne({
            userId: doc._id,
            token: req.body.token
        });
        if (!token) {
            return res.status(401).send({error: "invalid token provided, token not found"});
        }
        const password = req.body.password;
        const newHashedPassword = await bcrypt.hash(password, 10);
        doc.password = newHashedPassword;
        await doc.save();
        await token.delete();

        res.send({message: "password successfully reset"});
    } catch (err) {
        console.log(err);
        res.status(500).send({message: "An error occurred, check logs"});
    }

}
