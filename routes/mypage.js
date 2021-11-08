const express = require('express');

const { User, Account, Card, AccountToCard } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.use((req, res, next) => { // 모든 라우터에 회원정보 넣어주기
    res.locals.user = req.user;
    next();
});

router.get('/', isLoggedIn, async(req, res, next) => {

    console.log("/mypage 진입");
    console.log("resident: ", req.user.resident_number);
    const myAccounts = await Account.findAll({
        raw: true,
        where: {
            UserResidentNum: req.user.resident_number
        }
    });
    const accountPK = (myAccounts[0]) ? true : false;

    const myCards = await Card.findAll({
        raw: true,
        where: {
            user_resident_number: req.user.resident_number
        }
    });
    const cardPK = (myCards[0]) ? true : false;

    res.render('myPage',{
        myAccounts,
        myAccountsPK: accountPK,
        myCards,
        myCardsPK: cardPK,
        user: req.user
    });
});

router.post('/accountDelete', isLoggedIn, async (req, res, next) => {
    try {
        console.log("/mypage/accountDelete 진입");

        const { name, account_num, deposit } = req.body;
        console.log("/mypage/accountDelete에서 ",req.body);

        const isCardResgistered = await Account.findOne({
            where: { account_num: account_num }
        });
        console.log("isCardResgistered.isCardRegistered = ",isCardResgistered.isCardRegistered);
        if (isCardResgistered.isCardRegistered === 'T') { // 카드랑 연결 되어 있으면
            const thisCardShouldBeDestoryed = await AccountToCard.findOne({
                where: { account_num: account_num }
            });
            const thisCard = thisCardShouldBeDestoryed.card_num;
            return res.send(`<script type="text/javascript">alert("카드랑 연동되어 있는 계좌입니다. 해당 카드(${thisCard}) 부터 해지하세요"); location.href="/mypage/";</script>`);
        } else{
            await Account.destroy({ where: { account_num: account_num } });
            return res.send(`<script type="text/javascript">location.href="/mypage/";</script>`);
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.post('/cardDelete', isLoggedIn, async (req, res, next) => {
    try {
        console.log("/mypage/cardDelete 진입");
        const { name, card_number, user_account_name } = req.body;
        console.log("/mypage/cardDelete에서 ",req.body);

        await Card.destroy({ where: { card_number: card_number } });
        await AccountToCard.destroy({ where: {card_num: card_number } });

        await Account.update({
            isCardRegistered: 'F'
        },{
            where: {
                account_num: user_account_name
            }
        });

        return res.send(`<script type="text/javascript">alert("${card_number} 카드가 해지 되었습니다."); location.href="/mypage/";</script>`);

    } catch (error) {
        console.log(error);
        next(error);
    }

});

module.exports = router;