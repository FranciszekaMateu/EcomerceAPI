const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const { UserModel } = require('../models/user.model');

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    const user = await UserModel.findOne({ email });
    if (!user) {
        return done(null, false, { message: 'Usuario o contraseña incorrectos' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return done(null, false, { message: 'Usuario o contraseña incorrectos' });
    }

    return done(null, user);
}));


passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: '/auth/github/callback',
    scope: ['user:email']
}, async (accessToken, refreshToken, profile, done) => {
    let user = await UserModel.findOne({ githubId: profile.id });

    if (!user) {
        user = await UserModel.create({
            githubId: profile.id,
            email: profile.emails[0].value,
            displayName: profile.displayName
        });
    }

    return done(null, user);
}));


passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    const user = await UserModel.findById(id);
    done(null, user);
});


router.post('/login', passport.authenticate('local'), (req, res) => {
    res.status(200).send({
        status: 'success',
        payload: req.user,
        message: 'Login correcto',
    });
});


router.get('/auth/github', passport.authenticate('github'));

router.get('/auth/github/callback', passport.authenticate('github', {
    failureRedirect: '/login',
}), (req, res) => {
    res.redirect('/');
});

module.exports = router; 

