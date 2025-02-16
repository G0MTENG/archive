require('dotenv').config()

const password = process.env.PASSWORD

module.exports = {
  "development": {
    "username": "root",
    "password": password,
    "database": "nodejs",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": password,
    "database": "nodejs",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": password,
    "database": "nodejs",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
