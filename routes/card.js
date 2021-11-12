const express = require('express');

const { User, Card, Account, AccountToCard } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.use((req, res, next) => { // 모든 라우터에 회원정보 넣어주기
    res.locals.user = req.user;
    next();
});

router.post('/', isLoggedIn, async(req, res, next) => {
    const {
        whichAccount, itemName,
        annual_fee, fee,
        grade, name, resident_number,
        phone, pageNum, limit
    } = req.body;
    console.log("@@ : ", req.body);

    const cardNumber = Math.floor(Math.random() * 9999999) + 1000000;
    const finalCardNumber = "MB" + cardNumber;

    const doesUserhaveCard = await AccountToCard.findOne({
        where: {
            card_name: itemName,
            user_resident_number: req.user.resident_number
        }
    });
    const doesUserhaveCardByAccount = await AccountToCard.findOne({
        where: {
            card_name: itemName,
            account_num: whichAccount,
            user_resident_number: req.user.resident_number
        }
    });
    const nameOfcard = (doesUserhaveCard === null) ? 'false' : doesUserhaveCard.card_name ;

    const userInfo = await User.findOne({
        where: {
            resident_number: req.user.resident_number
        }
    });

    if( userInfo.resident_number === resident_number &&
        userInfo.name === name &&
        userInfo.phone === phone)
    {
        if (nameOfcard === itemName && doesUserhaveCardByAccount) {
            return res.send(`<script type="text/javascript">alert("이미 보유중이신 카드 입니다."); location.href="/card/";</script>`);
        } else {
            const LatestPkOfCard = await Card.findOne({order: [['createdAt', 'DESC']]});
            console.log("카드 : ", LatestPkOfCard);
            const AccountName = await Account.findOne({
                where: {
                    account_num: whichAccount
                }
            });
            if (LatestPkOfCard === null) {
                console.log("ㅋㅋㅋ: ", whichAccount);
                const accountPK = await Account.findOne({
                    where: {
                        account_num: whichAccount
                    }
                });
                console.log("계좌: ", accountPK);

                // 카드 아이디 업데이트
                await AccountToCard.create({
                    card_num: finalCardNumber,
                    card_name: itemName,
                    account_num: whichAccount,
                    account_name: AccountName.name,
                    user_resident_number: resident_number
                });

                const is = await Card.create({
                    name: itemName,
                    card_number: finalCardNumber,
                    annual_fee: annual_fee,
                    fee: fee,
                    grade: grade,
                    limit: limit,
                    user_account_name: whichAccount,
                    user_name: req.user.name,
                    user_phone: req.user.phone,
                    user_email: req.user.email,
                    user_resident_number: req.user.resident_number
                });
                console.log("?? : ", is);

                await Account.update({
                    is_card_registered: 'T'
                }, {
                    where: {
                        account_num: whichAccount
                    }
                });

            } else {
                console.log("else에 들어감");
                console.log("else의 ㅋㅋㅋ: ", whichAccount);

                const accountPK = await Account.findOne({
                    where: {
                        account_num: whichAccount
                    }
                });
                console.log("계좌: ", accountPK);

                // 카드 아이디 업데이트
                await AccountToCard.create({
                    card_num: finalCardNumber,
                    card_name: itemName,
                    account_num: whichAccount,
                    account_name: AccountName.name,
                    user_resident_number: resident_number
                });

                await Card.create({
                    name: itemName,
                    card_number: finalCardNumber,
                    annual_fee: annual_fee,
                    fee: fee,
                    grade: grade,
                    limit: limit,
                    user_account_name: whichAccount,
                    user_name: req.user.name,
                    user_phone: req.user.phone,
                    user_email: req.user.email,
                    user_resident_number: req.user.resident_number
                });

                await Account.update({
                    is_card_registered: 'T'
                }, {
                    where: {
                        account_num: whichAccount
                    }
                });

            }
            return res.send(`<script type="text/javascript">alert("카드발급 완료"); location.href="/";</script>`);
        }
    } else {
        return res.send(`<script type="text/javascript">alert("회원 정보가 틀렸습니다."); location.href='/card/${pageNum}';</script>`);
    }
});

router.get('/1', async(req, res, next) => {
    res.render('card_detail_fir');
});

router.get('/2', async(req, res, next) => {
    res.render('card_detail_sec');
});

router.get('/sign', isLoggedIn, async(req, res, next) => {
    const { itemName, annual_fee, fee, grade, limit, pageNum } = req.query;
    console.log("@@ : ", itemName, annual_fee, fee, grade, limit);

    const myAccounts = await Account.findAll({
        where: {
            user_resident_num: req.user.resident_number
        }
    });

    res.render('card_sign',{
        myAccounts,
        name: req.user.name,
        itemName,
        annual_fee,
        fee,
        grade,
        limit,
        pageNum
    });
});

module.exports = router;