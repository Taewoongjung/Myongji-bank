const express = require('express');
const multer = require('multer');
const path = require('path');
const sequelize = require("sequelize");
const Op = sequelize.Op;

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
})

module.exports = router;