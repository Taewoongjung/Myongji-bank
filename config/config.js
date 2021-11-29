require('dotenv').config();

module.exports = {
  "development": {
    "username": "root",
    "password": process.env.DB_SECRET,
    "database": "Myungji-bank",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "timezone": '+00:00',
    "pool": {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  },
  "test": {
    "username": "root",
    "password": process.env.DB_SECRET,
    "database": "Myungji-bank",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "timezone": '+00:00',
  },
  "production": {
    "username": "root",
    "password": process.env.DB_SECRET,
    "database": "Myungji-bank",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "timezone": '+00:00',
  }
}
