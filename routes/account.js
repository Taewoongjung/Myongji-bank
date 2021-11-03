const express = require('express');
const multer = require('multer');
const path = require('path');
const sequelize = require("sequelize");
const Op = sequelize.Op;

const { User, Account } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.use((req, res, next) => { // 모든 라우터에 회원정보 넣어주기
    res.locals.user = req.user;
    next();
});

router.post('/', isLoggedIn, async(req, res, next) => {
    const { itemName, variability, fee, interest } = req.body;
    console.log("!! : ", req.body);
    console.log("!@!@ : ", req.user.id);

    const userAccount = await Account.findOne({ where: { UserId: req.user.id } });

    if(userAccount) {
        return res.send(`<script type="text/javascript">alert("이미 가지고 계시는 통장입니다"); location.href="/";</script>`);

    } else {
        await Account.create({
            name: itemName,
            variability: variability,
            fee: fee,
            interest: interest,
            UserId: req.user.id
        });
        return res.send(`<script type="text/javascript">alert("통장 개설 완료"); location.href="/";</script>`);
    }
});

router.get('/1', async(req, res, next) => {
    res.render('account_Detail');
});

router.get('/sign', async(req, res, next) => {
    const { itemName, variability, fee, interest } = req.query;
    console.log("@@ : ", itemName, variability, fee, interest);

    res.render('account_sign',{
        itemName,
        variability,
        fee,
        interest
    });
});

module.exports = router;