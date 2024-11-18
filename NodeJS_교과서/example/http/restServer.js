const http = require('http')
const fs = require('fs')

const users = {}

const server = http.createServer(async (req, res) => {
  const { method, url } = req
  try {
    if (method === 'GET') {
      if (url === '/') {
        const resFrontHTMLFile = await fs.readFile(`${__dirname}/restFront.html`)
        res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' })
        return res.end(resFrontHTMLFile) // 함수이기 떄문에 return 해줘야지 함수가 끝남
      } else if (url === '/about') {
        const aboutHTMLFile = await fs.readFile(`${__dirname}/about.html`)
        res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' })
        return res.end(aboutHTMLFile)
      } else if (url === '/users') {
        res.writeHead(200, { 'content-type': 'application/json; charset=utf-8' })
        return res.end(JSON.stringify(users))
      }

      // 주소가 / | /about이 아니라면 (기타)
      try {
        const resource = await fs.readFile(`${__dirname}/${url}`)
        return res.end(resource)
      } catch(error) {
        // 주소에 해당하는 라우트를 찾지 못했다는 404 NOT FOUND ERROR 발생
      }

      res.writeHead(404)
      return res.end('NOT FOUND')
    } else if (method === 'POST') {
      if (url.startsWith('/user')) {
        let body = ''

        req.on('data', (data) => {
          body += data
        })

        return req.on('end', () => {
          console.log('POST 본문(body): ', body)
          const { name } = JSON.parse(body)
          const id = Date.now()
          users[id] = name
          res.writeHead(201, { 'content-type': 'text/plain; charset=utf-8' })
          return res.end('등록 성공')
        })
      }
    } else if (method === 'DELETE') {
      if (url.startsWith('/users/')) {
         const key = url.split('/')[2]
         delete users[key]
         res.writeHead(200, { 'content-type': 'application/json; charset=utf-8' })
         return res.end(JSON.stringify(users))
      }

      res.writeHead(404)
      return res.end('NOT FOUND')
    } else if (method === 'PUT') {
      if (url.startsWith('/users/')) {
        const key = url.split('/')[2]
        let body = ''
        req.on('data', (data) => {
          body += data
        })
        return req.on('end', () => {
          console.log('PUT 본문(body): ', body)
          users[key] = JSON.parse(body).name
          res.writeHead(200, { 'content-type': 'application/json; charset=utf-8' })
          
          return res.end(JSON.stringify(users))
        })
      }
    }
    res.writeHead(404)
    return res.end('NOT FOUND')
  } catch (error) {
    res.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' })
    res.end(error.message)
  }
}).listen(8080)

server.on('listening', () => {
  console.log('8080 포트에서 HMTL 웹 서버가 서빙 중입니다...')
})