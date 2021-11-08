const express = require('express');
const sequelize = require("sequelize");

const { User } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.use((req, res, next) => { // 모든 라우터에 회원정보 넣어주기
    res.locals.user = req.user;
    next();
});

router.get('/', async (req, res, next) => {
    try {
        console.log("index/ 진입");
        if(req.user) {
            res.render('index.html', {
                user: req.user
            });
        } else {
            res.render('index.html');
        }
    } catch(error) {
        console.log(error);
        next(error);
    }
});

router.get('/login', async (req, res, next) => {
    try {
        console.log("index/login 진입");
        res.render('login.html');
    } catch(error) {
        console.log(error);
        next(error);
    }
})

router.get('/signup', async (req, res, next) => {
    try {
        console.log("index/signup 진입");
        res.render('signup.html');
    } catch(error) {
        console.log(error);
        next(error);
    }
});

router.get('/account', isLoggedIn, async (req, res, next) => {
    try {
        console.log("index/account 진입");
        res.render('account.html');
    } catch(error) {
        console.log(error);
        next(error);
    }
});

router.get('/card', isLoggedIn, async (req, res, next) => {
    try {
        console.log("index/card 진입");
        res.render('card.html');
    } catch(error) {
        console.log(error);
        next(error);
    }
});

module.exports = router;