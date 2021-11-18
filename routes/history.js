const express = require('express');

const { User, Account, Deposit } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.use((req, res, next) => { // 모든 라우터에 회원정보 넣어주기
    res.locals.user = req.user;
    next();
});

router.get('/', isLoggedIn, async (req, res, next) => {
    try {
        const myAccountHistory = await Deposit.findAll({
            where: {
                sender: req.user.resident_number
            }
        });

        console.log("누구 : ", myAccountHistory);

        res.render("history.html", {
            myAccountHistory
        });
    } catch(error) {
        console.log(error);
        next(error);
    }
});

module.exports = router;