const express = require('express');

const moment = require('moment-timezone');

const { User, Account, Deposit } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.use((req, res, next) => { // 모든 라우터에 회원정보 넣어주기
    res.locals.user = req.user;
    next();
});

router.get('/', isLoggedIn, async (req, res, next) => {
    try {
        const [myAccountHistory] = await Promise.all([
            Deposit.findAll({
                where: {
                    receiver_resident_num: req.user.resident_number
                },
            }),
        ]);
        console.log("누구 : ", myAccountHistory);

        const [myAccountHistoryReceived] = await Promise.all([
            Deposit.findAll({
                where: {
                    sender_resident_num: req.user.resident_number
                },
            }),
        ]);

        console.log("ㅁㅁㅁ음 : ", myAccountHistoryReceived);

        const history_fir = [];
        for (const new_hist of myAccountHistory) {
            const { trade_num, sender_resident_num, sender,
                sender_remain_money, sender_name, message,
                money, receiver, receiver_resident_num,
                receiver_remain_money, receiver_name, createdAt
            } = new_hist;
            history_fir.push({
                createdAt: moment(createdAt).format('YYYY.MM.DD HH:mm'),
                trade_num, sender_resident_num, sender,
                sender_remain_money, sender_name, message,
                money, receiver, receiver_resident_num,
                receiver_remain_money, receiver_name,
            });
        }

        const history_sec = [];
        for (const new_hist of myAccountHistoryReceived) {
            const { trade_num, sender_resident_num, sender,
                sender_remain_money, sender_name, message,
                money, receiver, receiver_resident_num,
                receiver_remain_money, receiver_name, createdAt
            } = new_hist;
            history_sec.push({
                createdAt: moment(createdAt).format('YYYY.MM.DD HH:mm'),
                trade_num, sender_resident_num, sender,
                sender_remain_money, sender_name, message,
                money, receiver, receiver_resident_num,
                receiver_remain_money, receiver_name,
            })
        }


        res.render("history.html", {
            myAccountHistory: history_fir,
            myAccountHistoryReceived: history_sec,
            myName: req.user.name,
            myAccountNum: req.user.resident_number
        });
    } catch(error) {
        console.log(error);
        next(error);
    }
});

module.exports = router;