const fs = require('fs').promises

;(async () => {
  await fs.writeFile(`${__dirname}/b.txt`, '반갑습니다.')

  const result = (await fs.readFile(`${__dirname}/b.txt`)).toString() // 쓴 내용을 읽습니다.
  console.log(result) // 반갑습니다.
})()