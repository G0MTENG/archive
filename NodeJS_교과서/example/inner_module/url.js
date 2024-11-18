const url = require('url')

const { URL } = url // 노드에서도 제공해서 생략 가능

const myURL = new URL('http://www.gilbut.co.kr/book/bookList.aspx?sercate1=01001000#anchor')
console.log('new URL', myURL)
console.log('url.format()', url.format(myURL))