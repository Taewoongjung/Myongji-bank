const express = require('express');
const multer = require('multer');
const path = require('path');
const sequelize = require("sequelize");
const Op = sequelize.Op;

const { User } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.post('/', isLoggedIn, async(req, res, next) => {

});

router.get('/1', async(req, res, next) => {
    res.render('card_detail_fir');
});

router.get('/2', async(req, res, next) => {
    res.render('card_detail_sec');
});

router.get('/sign', isLoggedIn, async(req, res, next) => {
    res.render('card_sign');
});

module.exports = router;