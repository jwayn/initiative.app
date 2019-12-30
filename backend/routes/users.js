const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const createError = require('http-errors');
const uuidv4 = require('uuid/v4');
require('dotenv').config();

const User = require('../db/user')

const router = express.Router();

//Ensure that email/password is valid
function validUser(user) {
    const validEmail = typeof user.email == 'string' && 
                        user.email.trim() != '';
    const validPassword = typeof user.password == 'string' && 
                        user.password.trim() != '' &&
                        user.password.trim().length >= 6;

    return validEmail && validPassword;
}

router.post('/signin', async (req, res, next) => {
    try{
        if(validUser(req.body)) {
            const user = await User.getOneByEmail(req.body.email);
            if(user) {
                const result = await bcrypt.compare(req.body.password, user.password);
                // If the password matches
                if(result){
                    User.updateLastLogin(user.id);
                    jwt.sign({user_id: user.id, username: user.username, email: user.email}, process.env.JWT_SECRET, {expiresIn: '1d'}, (err, token) => {
                        res.json({
                            token
                        });
                    });
                } else {
                    next(createError(403, 'Forbidden'));
                }
            } else {
                next(createError(403, 'Forbidden'));
            };
        };
    } catch (err) {
        next(err)
    }
});

router.post('/signup', async (req, res, next) => {
    if(validUser(req.body)) {
        const user = await User.getOneByEmail(req.body.email)
        if(!user) {
            const hash = await bcrypt.hash(req.body.password, 10);
            const userId = await uuidv4();
            const user = {
                id: userId,
                username: req.body.username,
                email: req.body.email,
                password: hash,
            };

            const newUser = await User.create(user);

            await jwt.sign({user_id: newUser.id, email: newUser.email, username: newUser.username}, process.env.JWT_SECRET, {expiresIn: '1d'}, (err, token) => {
                res.json({
                    token
                });
            });

        } else {
            const err = new Error('A user with that email address already exists.');
            err.status = 400;
            next(err)
        }
    } else {
        const err = new Error('Invalid email or password.');
        err.status = 400;
        next(err)
    }
});


module.exports = router;