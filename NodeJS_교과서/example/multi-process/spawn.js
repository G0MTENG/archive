const spawn = require('child_process').spawn
const process = spawn('python', [`${__dirname}/hello.py`])

process.stdout.on('data', (data) => {
  console.log(data.toString())
})

process.stderr.on('data', (data) => {
  console.log(data.toString())
})