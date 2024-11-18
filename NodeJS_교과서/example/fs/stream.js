const fs = require('fs')

// a.txt => hello
const readStream = fs.createReadStream(`${__dirname}/a.txt`, {
  highWaterMark: 1
})
const data = []

readStream.on('data', (chunk) => {
  data.push(chunk)
  console.log('data: ', chunk, chunk.length)
  // data:  <Buffer 68> 1
  // data:  <Buffer 65> 1
  // data:  <Buffer 6c> 1
  // data:  <Buffer 6c> 1
  // data:  <Buffer 6f> 1
})

readStream.on('end', () => {
  console.log('end: ', Buffer.concat(data).toString()) // end:  hello
})

readStream.on('error', (error) => {
  console.log('error', error)
})