const http = require('http')

http.createServer((req, res) => {
  console.log(req.url, req.headers.cookie)
  res.writeHead(200, { 'set-cookie': 'testCookie=test' })
  res.end('Hello Cookie')
}).listen(8080, () => {
  console.log('8080')
})