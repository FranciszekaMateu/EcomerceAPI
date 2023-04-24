const express = require('express');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const configurePassport = require('./passport-config');
configurePassport(passport);
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

