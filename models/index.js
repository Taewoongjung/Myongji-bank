const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];
const User = require('./user');
const Card = require('./card');
const Account = require('./account');
const Deposit = require('./deposit');
const AccountToCard = require('./accountcard');

const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.User = User;
db.Card = Card;
db.Account = Account;
db.Deposit = Deposit;
db.AccountToCard = AccountToCard;

User.init(sequelize);
Card.init(sequelize);
Account.init(sequelize);
Deposit.init(sequelize);
AccountToCard.init(sequelize);

User.associate(db);
Card.associate(db);
Account.associate(db);
AccountToCard.associate(db);

module.exports = db;
