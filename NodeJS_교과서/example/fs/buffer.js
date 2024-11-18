const buffer = Buffer.from('버퍼')
console.log('from()', buffer) // <Buffer eb b2 84 ed 8d bc>
console.log('length', buffer.length) // length 6
console.log('toString()', buffer.toString()) // toString() 버퍼

const array = [Buffer.from('a '), Buffer.from('a '), Buffer.from('a ')]
const buffer2 = Buffer.concat(array)
console.log('concat()', buffer2.toString()) // concat() a a a

const buffer3 = Buffer.alloc(3)
console.log('alloc()', buffer3) // alloc() <Buffer 00 00 00>