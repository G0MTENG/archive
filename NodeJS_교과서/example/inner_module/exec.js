const exec = require('child_process').exec
const process = exec('ls')

process.stdout.on('data', (data) => {
  console.log(data.toString())
  // ls 명령어를 입력했을 때의 결과값을 출력한다.
})

process.stderr.on('data', (data) => {
  console.error(data.toString())
})