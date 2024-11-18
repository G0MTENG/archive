const zlib = require('zlib')
const fs = require('fs')

const readStream = fs.createReadStream(`${__dirname}/a.txt`)
const zlibStream = zlib.createGzip()
const writestream = fs.createWriteStream(`${__dirname}/c.txt.gz`)

readStream.pipe(zlibStream).pipe(writestream)