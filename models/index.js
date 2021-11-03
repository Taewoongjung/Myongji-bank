const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];
const User = require('./user');
const Card = require('./Card');
const Account = require('./Account');

const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.User = User;
db.Card = Card;
db.Account = Account;

User.init(sequelize);
Card.init(sequelize);
Account.init(sequelize);

User.associate(db);
Card.associate(db);
Account.associate(db);

module.exports = db;
