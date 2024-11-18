const fs = require('fs').promises
;(async () => {
  const fileData = (await fs.readFile(`${__dirname}/a.txt`)).toString()
  console.log(fileData) // hello
})()