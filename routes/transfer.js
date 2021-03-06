const express = require('express');

const { User, Account, Deposit } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.use((req, res, next) => { // 모든 라우터에 회원정보 넣어주기
    res.locals.user = req.user;
    next();
});

router.post('/', isLoggedIn, async(req, res, next) => {
    console.log("transfer/ 진입");
    const{ deposit, accountNum, transferInput, sendingAccount, transferMessage, sendingAccountRemainMoney } = req.body;
    console.log("!! : ", req.body);

    if(Number(deposit) < Number(transferInput)) {
        return res.send(`<script type="text/javascript">alert("이체가능 금액을 넘었습니다"); location.href="/";</script>`);
    } else {
        const account = await Account.findOne({
            where: {
                account_num: accountNum
            }
        });

        // 받는 사람의 계좌에서 받는 만큼 더하기
        await Account.update({
            deposit: Number(account.deposit) + Number(transferInput)
        }, {
            where: {
                account_num: accountNum
            }
        });

        // 보내는 사람의 계좌에서 보내는 만큼 빼기
        await Account.update({
            deposit: deposit - transferInput
        }, {
            where: {
                user_resident_num: req.user.resident_number,
                account_num: sendingAccount
            }
        });

        await Deposit.create({
            sender_resident_num: req.user.resident_number,
            sender: sendingAccount,
            sender_remain_money: Number(Number(sendingAccountRemainMoney) - Number(transferInput)),
            sender_name: req.user.name,
            money: transferInput,
            message: transferMessage,
            receiver_resident_num: account.user_resident_num,
            receiver: account.account_num,
            receiver_remain_money: Number(account.deposit + Number(transferInput)),
            receiver_name: account.user_name
        });
        // await Deposit.create({
        //     receiver_resident_num: req.user.resident_number,
        //     receiver: sendingAccount,
        //     receiver_remain_money: Number(Number(sendingAccountRemainMoney) - Number(transferInput)),
        //     receiver_name: req.user.name,
        //     money: transferInput,
        //     message: transferMessage,
        //     sender_resident_num: account.user_resident_num,
        //     sender: account.account_num,
        //     sender_remain_money: Number(account.deposit + Number(transferInput)),
        //     sender_name: account.user_name
        // });

        return res.send(`<script type="text/javascript">alert("이체 하였습니다"); location.href="/";</script>`);
    }
});

router.get('/fir', isLoggedIn, async(req, res, next) => {
    console.log("transfer/fir 진입");

    const myAccounts = await Account.findAll({
        where: {
            user_resident_num: req.user.resident_number
        }
    });

    res.render('transfer_fir', {
        myAccounts
    });
});

router.get('/sec', isLoggedIn, async(req, res, next) => {
    console.log("transfer/sec 진입");

    const { whichAccount, accountNum } = req.query;
    console.log("모든 : ", req.query);

    if(whichAccount === accountNum) {
        return res.send(`<script type="text/javascript">alert("동일한 계좌에 입금이 불가능합니다."); location.href="/transfer/fir";</script>`);

    } else {
        const isAccountRight = await Account.findOne({
            where: {
                account_num: accountNum
            }
        });

        const moneyTransfer = await Account.findOne({
            where: {
                account_num: whichAccount
            }
        });
        console.log("? : ", moneyTransfer);

        if(!isAccountRight) {
            return res.send(`<script type="text/javascript">alert("없는 계좌입니다"); location.href="/transfer/fir";</script>`);
        } else {

            res.render('transfer_sec', {
                toHim: isAccountRight.account_num,
                moneyTransfer
            });
        }
    }

});

module.exports = router;