const passport = require('passport');

const local = require('./local');
const User = require('../models/user');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.resident_number);
    });

    passport.deserializeUser((resident_number, done) => {
        User.findOne({ where: { resident_number } })
            .then(user => done(null, user))
            .catch(err => done(err));
    });

    local();
};