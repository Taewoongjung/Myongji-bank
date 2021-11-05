const express = require('express');
const multer = require('multer');
const path = require('path');
const sequelize = require("sequelize");
const Op = sequelize.Op;

const { User, Card, Account } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.use((req, res, next) => { // 모든 라우터에 회원정보 넣어주기
    res.locals.user = req.user;
    next();
});

router.post('/', isLoggedIn, async(req, res, next) => {
    const { whichAccount, itemName, annual_fee, fee, grade } = req.body;
    console.log("@@ : ", req.body);

    const cardNumber = Math.floor(Math.random() * 9999999) + 1000000;
    const finalCardNumber = "MB" + cardNumber;

    console.log("!!!!! : ", finalCardNumber);

    await Card.create({
        name: itemName,
        card_number: finalCardNumber,
        annual_fee: annual_fee,
        fee: fee,
        grade: grade,
        user_account_name: whichAccount,
        UserId: req.user.id,
        user_name: req.user.name,
        user_phone: req.user.phone,
        user_email: req.user.email,
        user_resident_number: req.user.resident_number
    });

    // 카드 아이디 업데이트
    await Account.update({
        cardId: finalCardNumber
    },{
        where: {
            account_num: whichAccount
        }
    })
    return res.send(`<script type="text/javascript">alert("카드발급 완료"); location.href="/";</script>`);

});

router.get('/1', async(req, res, next) => {
    res.render('card_detail_fir');
});

router.get('/2', async(req, res, next) => {
    res.render('card_detail_sec');
});

// router.get('/sign', isLoggedIn, async(req, res, next) => {
//     res.render('card_sign');
// });

router.get('/sign', isLoggedIn, async(req, res, next) => {
    const { itemName, annual_fee, fee, grade } = req.query;
    console.log("@@ : ", itemName, annual_fee, fee, grade);

    const myAccounts = await Account.findAll({
        where: {
            UserId: req.user.id
        }
    });

    res.render('card_sign',{
        myAccounts,
        name: req.user.name,
        itemName,
        annual_fee,
        fee,
        grade
    });
});

module.exports = router;