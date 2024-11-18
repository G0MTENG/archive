const http = require('http')
const fs = require('fs').promises
const path = require('path')

const parseCookie = (cookie = '') => {
  return cookie
    .split(';')
    .map((v) => v.split('='))
    .reduce((acc, [key, value]) => {
      acc[key.trim()] = decodeURIComponent(value)
      return acc
    }, {})
}

const session = {}

http.createServer(async (req, res) => {
  const cookies = parseCookie(req.headers.cookie)
  if (req.url.startsWith('/login')) { // input 입력하면 localhost:8080/login?name={name} 으로 요청이 감
    const url = new URL(req.url, 'http://localhost:8080')
    const name = url.searchParams.get('name')
    const expires = new Date()
    expires.setMinutes(expires.getMinutes() + 5)
    const uniqueInt = Date.now() // 이게 찐 cookie 값임 (이게 Key 값임)
    session[uniqueInt] = { // 세션 객체에 cookie값을 지정함
      name,
      expires,
    }
    res.writeHead(302, {
      location: '/',
      'set-cookie': `session=${uniqueInt};Expires=${expires.toGMTString()};HttpOnly;Path=/`
    })
    res.end()
  } else if (cookies.session && session[cookies.session].expires > new Date()) {
    // 세션 쿠키가 존재하고, 만료 기간이 지나지 않았다면
    res.writeHead(200, { 'content-type': 'text/plain;charset=utf-8' })
    res.end(`${session[cookies.session].name}님 안녕하세요.`)
  } else { // localhost:8080으로 들어간다면
    try {
      const data = await fs.readFile(path.join(__dirname, 'index.html'))
      res.writeHead(200, { 'content-type': 'text/html;charset=utf-8' })
      res.end(data)
    } catch (error) {
      res.writeHead(500, { 'content-type': 'text/plain;charset=utf-8' })
      res.end(error.message)
    }
  }
}).listen(8080, () => {
  console.log('8080 포트에서 서버 대기')
})