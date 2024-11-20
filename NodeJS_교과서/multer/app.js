const express = require('express')
const morgan = require('morgan')
const path = require('path')
const multer = require('multer')
const fs = require('fs')

const app = express()

try {
  fs.readdirSync('uploads')
} catch(error) {
  console.error(error.message)
  fs.mkdirSync('uploads')
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads')
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname)
      done(null, path.basename(file.originalname, ext) + Date.now() + ext)
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 }
})

app.set('port', 3000)

// morgan 미들웨어 적용
app.use(morgan('dev'))
// 정적 파일 제공
app.use('/', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.post('/', upload.single('image'), (req, res) => {
  console.log(req.file, req.body)

  res.send('ok')
})

// 에러 핸들 미들웨어 적용
app.use((err, req, res, next) => {
  console.error(err.message)
  res.status(404).send('404 에러입니다')
})

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중')
})