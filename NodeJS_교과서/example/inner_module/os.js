const os = require('os')

const printMethod = (list) => {
  for (const method of list) {
    console.log(`os.${method} : ${os[method]()}`)
  }
}

console.log('운영체제 정보')
printMethod(['arch', 'platform', 'type', 'uptime', 'hostname', 'release'])


console.log('경로')
printMethod(['homedir', 'tmpdir'])

console.log('cpu 정보')
console.log(os.cpus())

console.log('메모리 정보')
printMethod(['freemem', 'totalmem'])