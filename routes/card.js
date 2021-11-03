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

module.exports = router;