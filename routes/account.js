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
    const { itemName, variability, fee, interest, resident_number, phone, name } = req.body;
    console.log("!! : ", req.body);
    console.log("!@!@ : ", req.user.id);

    const userAccount = await Account.findOne({
        where: {
            name: itemName,
            UserId: req.user.id
        }
    });

    if(userAccount) {
        return res.send(`<script type="text/javascript">alert("이미 가지고 계시는 통장입니다"); location.href="/account";</script>`);
    } else {

        if(req.user.resident_number !== resident_number){
            return res.send(`<script type="text/javascript">alert("주민번호를 다시 확인해주세요."); location.href="/account";</script>`);
        }
        if(req.user.phone !== phone){
            return res.send(`<script type="text/javascript">alert("전화번호를 다시 확인해주세요."); location.href="/account";</script>`);
        }
        if(req.user.name !== name){
            return res.send(`<script type="text/javascript">alert("이름을 다시 확인해주세요."); location.href="/account";</script>`);
        }

        const accountNumber = Math.floor(Math.random() * 99999999999) + 10000000000;

        await Account.create({
            name: itemName,
            account_num: accountNumber,
            variability: variability,
            fee: fee,
            interest: interest,
            isCardRefistered: 'F',
            UserId: req.user.id,
            UserName: req.user.name,
            UserPhone: req.user.phone,
            UserEmail: req.user.email,
            UserResidentNum: req.user.resident_number
        });
        return res.send(`<script type="text/javascript">alert("통장 개설 완료"); location.href="/";</script>`);
    }
});

router.get('/1', async(req, res, next) => {
    res.render('account_detail_fir');
});
router.get('/2', async(req, res, next) => {
    res.render('account_detail_sec');
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