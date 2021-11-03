const express = require('express');
const passport = require('passport');
const sanitize = require('sanitize-html');
const bcrypt = require('bcrypt');

const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/user');


const router = express.Router();

router.post('/signup', isNotLoggedIn, async (req, res, next) => {
    console.log("auth/signup 진입");

    const { id, name, phone, email, password, re_password, resident_number, address, job } = req.body;
    try {
        const exUser = await User.findOne({ where: { id: id } });
        const exUserSecondFilter = await User.findOne({ where: { resident_number: resident_number } });

        if (exUser) {
            return res.send(`<script type="text/javascript">alert("이미 가입된 이메일입니다."); location.href="/signup/";</script>`);
        }
        else if (exUserSecondFilter) {
            return res.send(`<script type="text/javascript">alert("이미 가입된 회원입니다."); location.href="/signup/";</script>`);
        }
        else if (password !== re_password) {
            return res.send(`<script type="text/javascript">alert("비밀번호가 맞지 않습니다."); location.href="/signup/";</script>`);
        }
        sanitize(password);
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            uid: id,
            name: name,
            phone: phone,
            email: email,
            password: hash,
            resident_number: resident_number,
            address: address,
            job: job
        });
        return res.send(`<script type="text/javascript">alert("회원가입을 완료했습니다."); location.href="/login/";</script>`);
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
    console.log("auth/login 진입");

    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            return res.send(`<script type="text/javascript">alert("${info.message}"); location.href="/login/";</script>`);
        }
        return req.login(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
    })(req, res, next);
});

router.get('/logout', isLoggedIn, (req, res) => {
    console.log("auth/logout 진입");

    req.logout();
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;

