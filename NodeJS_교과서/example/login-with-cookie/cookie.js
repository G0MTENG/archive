const http = require('http')
const fs = require('fs').promises
const path = require('path')

// name=taeyun;age=12
/*
  {
    name: taeyun
    age: 12
  }
*/

const parseCookie = (cookie = '') => {
  return cookie
    .split(';') // ['name=taeyn', 'age=12']
    .map(v => v.split('=')) // [['name', 'taeyun'], ['age', '12']]
    .reduce((acc, [key, value]) => {
      acc[key.trim()] = decodeURIComponent(value)
      return acc
    }, {})
}

http.createServer(async (req, res) => {
  const cookies = parseCookie(req.headers.cookie)

  // 주소가 login인 경우
  // index.html form에서 /login으로 formData를 보냄
  if (req.url.startsWith('/login')) {
    const url = new URL(req.url, 'http://localhost:8080')
    const name = url.searchParams.get('name')
    const expires = new Date()

    expires.setMinutes(expires.getMinutes() + 5)
    res.writeHead(302, {
      location: '/',
      'set-cookie': `name=${encodeURIComponent(name)};Expires=${expires.toGMTString()};HttpOnly;Path=/`
    })
    res.end()
  } else if (cookies.name) {
    res.writeHead(200, { 'content-type': 'text/plain;charset=utf-8' })
    res.end(`${cookies.name}님 안녕하세요.`)
  } else {
    try {
      const data = await fs.readFile(path.join(__dirname, 'index.html'))
      res.writeHead(200, { 'content-type': 'text/html;charset=utf-8' })
      res.end(data)
    } catch( error ) {
      res.writeHead(500, { 'content-type': 'text/plain;charset=utf-8' })
      res.end(error.message)
    }
  }
}).listen(8080, () => {
  console.log('8080 포트 서버 열림')
})