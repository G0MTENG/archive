const fs = require('fs')

const writeStream = fs.createWriteStream(`${__dirname}/a.txt`)
writeStream.on('finish', () => {
  console.log('파일에 정상적으로 썼습니다.')
})

writeStream.write('글쓰기1\n')
writeStream.write('글쓰기2')
writeStream.end()