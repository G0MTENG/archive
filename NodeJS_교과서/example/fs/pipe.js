const fs = require('fs')

const readFileStream = fs.createReadStream(`${__dirname}/a.txt`)
const writeFileStream = fs.createWriteStream(`${__dirname}/c.txt`)
readFileStream.pipe(writeFileStream)