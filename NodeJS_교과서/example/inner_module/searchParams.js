const url = new URL('http://naver.com/?page=3&page=4&limit=10')
const searchParams = url.searchParams

console.log(searchParams)
// URLSearchParams { 'page' => '3', 'page' => '4', 'limit' => '10' }

console.log('getAll', searchParams.getAll('page')) // ['3', '4']

console.log('get', searchParams.get('page')) // 3
console.log('get', searchParams.get('limit')) // 10

console.log('has', searchParams.has('page')) // true
console.log('has', searchParams.has('a')) // false

console.log(searchParams.keys()) // Iterator { 'page', 'page', 'limit' }
console.log(searchParams.values()) // Iterator { '3', '4', '10' }

searchParams.append('filter', 'node')
console.log(searchParams.get('filter')) // node

searchParams.set('filter', 'a')
console.log(searchParams.getAll('filter')) // [ 'a' ]

searchParams.delete('filter')
console.log(searchParams.has('filter')) // false

console.log(searchParams.toString()) // page=3&page=4&limit=10
