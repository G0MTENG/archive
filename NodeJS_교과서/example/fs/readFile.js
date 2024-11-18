const fs = require('fs')
fs.readFile(`${__dirname}/a.txt`, (error, data) => {
  if (error) {
    throw error
  }

  console.log(data) // <Buffer 68 65 6c 6c 6f>
  console.log(data.toString()) // hello
})