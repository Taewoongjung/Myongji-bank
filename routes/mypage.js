const express = require('express');

const { User, Account, Card } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.use((req, res, next) => { // 모든 라우터에 회원정보 넣어주기
    res.locals.user = req.user;
    next();
});

router.get('/', isLoggedIn, async(req, res, next) => {

    const myAccounts = await Account.findAll({
        where: {
            UserId: req.user.id
        }
    });

    const myCards = await Card.findAll({
        where: {
            UserId: req.user.id
        }
    });

    res.render('myPage',{
        myAccounts,
        myCards,
        user: req.user
    });
});

module.exports = router;