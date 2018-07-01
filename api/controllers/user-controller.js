const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = {
    async signup(req, res, next) {
        try {
            if (req.body.passwordConfirm === req.body.password) {
                const passwordHash = await bcrypt.hash(req.body.password, 10);
                const user = new User({
                    name: req.body.name,
                    password: passwordHash,
                    email: req.body.email
                });
                await user.save();

                return res.json({success: true});
            } else {
                return res.status(400).json({message: 'Confirm password doesn\'t match password.', success: false});
            }
        } catch (e) {
            if (e.name === 'ValidationError') {
                const errors = {};
                for (const key in e.errors) {
                    if (e.errors.hasOwnProperty(key)) {
                        errors[key] = e.errors[key].message;
                    }
                }

                return res.status(400).json({errors: errors, message: 'Validation failed.'});
            }

            next(e);
        }
    },

    async getUserExcept(req, res, next) {
        try {
            const user = await User.findOne({email: req.body.email});
            if (user) {
                return res.json({success: false, message: 'Email must be unique', exists: true});
            } else {
                return res.json({success: true, exists: false});
            }
        } catch (e) {
            next(e);
        }
    },

    async signin(req, res, next) {
        try {
            const user = await  User.findOne({email: req.body.email});
            if (!user) {
                return res.status(401).json({success: false, message: 'Authorization failed.'});
            }

            const match = await bcrypt.compare(req.body.password, user.password);
            if (match) {
                const token = await jwt.sign({
                    email: user.email,
                    password: user.password
                }, process.env.secret, {
                    expiresIn: '10 days',
                    subject: user._id.toString()
                });

                return res.json({
                    success: true,
                    expiresAt: new Date(Date.now() + 10 * 24 * 3600 * 1000).toString(),
                    token});
            } else {
                return res.status(401).json({success: false, message: 'Authorization failed.'});
            }
        } catch (e) {
            console.log(e);
            next(e);
        }
    }
};