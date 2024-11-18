const crypto = require('crypto')

const pass = 'pass'
const salt = 'salt'
const start = Date.now()

crypto.pbkdf2(pass, salt, 100000, 128, 'sha512', () => {
  console.log('1: ', Date.now() - start)
})
crypto.pbkdf2(pass, salt, 100000, 128, 'sha512', () => {
  console.log('2: ', Date.now() - start)
})
crypto.pbkdf2(pass, salt, 100000, 128, 'sha512', () => {
  console.log('3: ', Date.now() - start)
})
crypto.pbkdf2(pass, salt, 100000, 128, 'sha512', () => {
  console.log('4: ', Date.now() - start)
})
crypto.pbkdf2(pass, salt, 100000, 128, 'sha512', () => {
  console.log('5: ', Date.now() - start)
})
crypto.pbkdf2(pass, salt, 100000, 128, 'sha512', () => {
  console.log('6: ', Date.now() - start)
})
crypto.pbkdf2(pass, salt, 100000, 128, 'sha512', () => {
  console.log('7: ', Date.now() - start)
})
crypto.pbkdf2(pass, salt, 100000, 128, 'sha512', () => {
  console.log('8: ', Date.now() - start)
})

// output
// 3:  116
// 2:  128
// 4:  128
// 1:  128
// 5:  245
// 6:  245
// 8:  248
// 7:  248