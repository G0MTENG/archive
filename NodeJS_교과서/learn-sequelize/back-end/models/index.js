const Sequelize = require('sequelize')
const path = require('path')
require('dotenv').config()

const User = require('./user')
const Comment = require('./comment')

const config = require(path.join(__dirname, '../config/config.js'))[process.env.NODE_ENV || 'development']
// console.log('config', config)

// 순환참조가 발생할 수 있어 index.js에 db 객체를 만들어서 associate에 인자로 넣어줌
const db = {}

const sequelize = new Sequelize(config.database, config.username, config.password, config)

db.sequelize = sequelize

db.User = User
db.Comment = Comment

User.initiate(sequelize)
Comment.initiate(sequelize)

User.associate(db)
Comment.associate(db)

module.exports = db;