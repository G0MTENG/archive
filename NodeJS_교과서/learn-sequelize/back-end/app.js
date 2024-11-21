const express = require('express')
const path = require('path')
const morgan = require('morgan')
const cors = require('cors')

const { sequelize } = require('./models')

const app = express()

const indexRouter = require(path.join(__dirname, 'routers'))
const userRouter = require(path.join(__dirname, 'routers/user'))
const commentRouter = require(path.join(__dirname, 'routers/comment'))

app.set('port', process.env.PORT || 3000)

// sequelize 세팅
;(async () => {
  try {
    // force: true => 서버를 실행할 때마다 테이블을 재생성
    await sequelize.sync({ force: false })
    console.log('데이터베이스 연결 성공')
  } catch(error) {
    console.error(error.message)
    console.error('데이터베이스와의 연결이 실패했습니다.')
  }
})()

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', indexRouter)
app.use('/user', userRouter)
app.use('/comment', commentRouter)

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`)
  error.status = 404
  next(error)
})

app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {}
  res.status(err.status || 500)
  res.sendFile(path.join(__dirname, 'public/error.html'))
})

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중')
})