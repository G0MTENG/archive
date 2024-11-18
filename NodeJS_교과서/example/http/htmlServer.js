const fs = require('fs').promises
const http = require('http')

const server = http.createServer(async (req, res) => {
  try {
    const htmlFile = await fs.readFile(`${__dirname}/index.html`)
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' })
    return res.end(htmlFile)
  } catch(error) {
    console.error(error)
    res.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' })
    res.end(error.message)
  }
}).listen(8080)

server.on('listening', () => {
  console.log('8080 포트에서 HTML 웹서버가 서빙 중입니다.')
})