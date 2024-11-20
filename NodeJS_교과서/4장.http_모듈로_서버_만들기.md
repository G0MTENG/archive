# 04. http 모듈로 서버 만들기
## 4.1 요청과 응답 이해하기

클라이언트 → (요청: request) → 서버

서버 → (응답: response) → 클라이언트

서버는 이러한 요청을 받고, 응답을 보내는 부분이 있어야 함.

```jsx
const http = require('http')

http.createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'text/html; charset=utf-8'})
  res.write('<h1>Hello Node</h1>')
  res.end('<p>Hello Server!</p>')
}).listen(8080, () => {
  console.log('8080번 포트에서 서버 대기 중입니다!')
})
```

웹 브라우저에서 요청을 처리할 수 있도록 http 모듈을 통해 http 서버를 만듦

http://[localhost:8080](http://localhost:8080) 혹은 [http://127.0.0.1:8080](http://127.0.0.1:8080)에 접속하여 HTML 결과를 볼 수 있음

localhost

- 현재 컴퓨터의 내부 주소

port

- 서버 내에서 프로세스를 구분하는 번호
- 하나의 서버에서 데이터베이스와 통신하고, FTP 요청을 철하는 등 다양한 작업을 해야 함.
- 유명한 포트 (well-known port)
    - 21
        - TCP
    - 80
        - HTTP
    - 443
        - HTTPS
    - 3306
        - MYSQL
    - …

[http://gilbut.co.](http://gilbut.co.krdms)kr은 따로 포트가 없는데 80번 포트를 사용하기 때문

추가적으로 리눅스와 맥에서는 1024번 이하의 포트를 사용할 때 관리자 번호가 필요함

```jsx
const http = require('http')

http.createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'text/html; charset=utf-8'})
  res.write('<h1>Hello Node</h1>')
  res.end('<p>Hello Server!</p>')
}).listen(8080, () => {
  console.log('8080번 포트에서 서버 대기 중입니다!')
})
```

다시 코드를 보면

- `res.writeHead(200, { 'content-type': 'text/html; charset=utf-8'})`
    - 응답에 대한 정보를 기록하는 메서드
        - 200: 성공적인 요청
        - 콘텐츠의 형식이 HTML
        - 한글을 위해 charset utf-8

⇒ 헤더 (header)

- `res.write('<h1>Hello Node</h1>')`
- `res.end('<p>Hello Server!</p>')`
    - 응답을 종료하는 메서드
- 클라이언트로 보낼 데이터

⇒ 본문 (body)

```jsx
const http = require('http')

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'text/html; charset=utf-8'})
  res.write('<h1>Hello Node</h1>')
  res.end('<p>Hello Server!</p>')
}).listen(8080)

server.on('listening', () => {
	console.log('8080번 포트에서 서버 대기 중입니다!')
})

server.on('error', (error) => {
	console.error(error)
})
```

⇒ 이벤트 리스너를 등록해서 `listening`일 때와 `error`일 때를 핸들링할 수 있음.

`fs 모듈`을 사용하여 HTML 파일을 렌더링하기

```jsx
const fs = require('fs').promises
const http = require('http')

const server = http.createServer(async (req, res) => {
  try {
    const htmlFile = await fs.readFile(`${__dirname}/index.html`)
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' })
    return res.end(htmlFile)
  } catch(error) {
    console.error(error)
    // 에러는 일반 메시지이기 때문에 'text/plain'
    res.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' })
    res.end(error.message)
  }
}).listen(8080)

server.on('listening', () => {
  console.log('8080 포트에서 HTML 웹서버가 서빙 중입니다.')
})
```

### HTTP 상태 코드

200

- 성공

300

- 리다이렉션(다른 페이지로 이동)을 알리는 상태 코드

400

- 요청 오류

500

- 서버 오류

위에 코드를 보면 500번 에러를 보내고 있다. 요청 처리 과정 중 에러가 발생했다고 해서 응답을 보내지 않으면 안 된다. 요청이 성공했든 실패했든 응답 결과를 클라이언트로 요청이 마무리가 됐음을 보내야 한다.

## 4.2 REST와 라우팅 사용하기

REST(REpresentation State Transfer)은 서버의 자원을정의하고 자원에 대한 주소를 지정하는 방법

주소 = 명사

HTTP method = 동작

### HTTP method

- GET
    - 서버 자원을 가져올 때 사용
    - 브라우저에서 캐싱 가능
- POST
    - 서버에 자원을 새로 등록
- PUT
    - 서버의 자원을 요청에 들어 있는 자원으로 치환
- PATCH
    - 서버 자원의 일부만 수정
- DELETE
    - 서버의 자원을 삭제
- OPTIONS
    - 요청을 하기 전에 통신 옵션을 설명

장점 )

- 클라이언트가 누구든 상관없이 같은 방식으로 서버와 소통할 수 있음
- iOS, 안드로이드, 웹, 다른 서버 모두 요청할 수 있음
    
    ⇒ 서버와 클라이언트의 분리 → 서버 확장 시 클라이언트에 구애되지 않음
    

이러한 REST를 따르는 서버를 RESTful하다고 한다.

### 서버 개발

이제 다음과 같이 라우트를 정의하고 개발해보자.

| HTTP Method | 주소 | 역할 |
| --- | --- | --- |
| GET | / | restFront.html 파일 제공 |
| GET | /about | about.html 파일 제공 |
| GET | /users | 사용자 목록 제공 |
| GET | 기타 | 기타 정적 파일 제공 |
| POST | /user | 사용자 등록 |
| PUT | /user/:id | 해당 id의 사용자 수정 |
| DELETE | /user/:id | 해당 id의 사용자 제거 |

개발할 파일

- restFront.css
- restFront.html
- restFront.js
- about.html
- restServer.js

<aside>
💡

프론트엔드 부분은 빼고 백엔드 restServer.js만 개발

</aside>

restServer.js

```jsx
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
```

코드에서 `req.on(’data’)`와 `req.on(’end’)`를 사용하는데 요청 본문에 들어있는 데이터를 꺼내기 위한 작업이다.

`req`와 `res`도 내부적으로 스트림으로 되어있으므로 요청/응답 데이터가 스트림 형식으로 전달된다.

### 브라우저 네트워크 탭

- name
    - 요청 주소
- method
    - 요청 메소드
- status
    - HTTP 응답 코드
- protocol
    - 통신 프로토콜
- type
    - 요청의 종류
    - xhr ⇒ AJAX

- Headers
    - 공통 헤더
- Request Header
    - 요청의 헤더
- Response Header
    - 응답의 헤더
- Payload
    - 요청의 본문
- Preview / Response
    - 응답의 본문

이렇게 REST 서버를 만들었는데 메모리에 저장되므로 서버를 종료하면 데이터가 소실된다.

데이터를 영구적으로 저장하려면 데이터베이스를 사용해야 함.

## 4.3 쿠키와 세션 이해하기

클라이언트에서 보내는 요청에는 한 가지 큰 단점이 있다.

→ 누가 요청을 보내는지 모름 (IP / 브라우저 정보 이정도는 알 수 있지만, 그 유저라고 확정짓기 어려움)

⇒ 로그인 구현

로그인을 구현하기 위해서는 쿠키와 세션에 대해 알아야 함.

### 쿠키

서버는 요청에 대한 응답을 할 때 쿠키와 함께 보낼 수 있음.

클라이언트는 웹 브라우저에 쿠키를 저장하고, 다음 요청 때 쿠키를 동봉해서 보냄.

서버는 요청에 들어있는 쿠키를 읽어 누구인지 파악

💡 브라우저는 쿠키가 있다면 자동으로 동봉해서 보내주므로 따로 처리하지 않아도 됨.

쿠키는 Request Header에 담겨 전송되며, 브라우저는 Response Header의 Set-Cookie에 따라 쿠키를 저장한다.

```jsx
const http = require('http')

http.createServer((req, res) => {
  console.log(req.url, req.headers.cookie)
  res.writeHead(200, { 'set-cookie': 'testCookie=test' })
  res.end('Hello Cookie')
}).listen(8080, () => {
  console.log('8080')
})
```

쿠키 간에는 세미콜론을 넣어 각각을 구분함.

```jsx
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
```

- 쿠키명=쿠키값
    - 쿠키값
- Expires=날짜
    - 만료 기한
    - 이 기한이 지나면 쿠키가 제거됨
- Max-age=초
    - Expires와 비슷하지만 날짜 대신 초
- Domain=도메인명
    - 쿠키가 전송될 도메인을 특정
- Path=URL
    - 쿠키가 전송될 URL을 특정
- Secure
    - HTTPS일 경우 쿠키 전송
- HttpOnly
    - 자바스크립트에서 쿠키에 접근할 수 없음

하지만, 위의 방식대로 하면 Application 탭에 쿠키가 노출되고, 쿠키가 조작될 수 있기 때문에 민감한 개인정보는 쿠키에 저장하면 안 됨.

개선된 코드

```jsx
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
```

사용자 cookie에 사용자 개인 정보를 직접 담는 것이 아닌 uniqueInt를 할당받아 쓰고, 객체에서 그 uniqueInt를 통해 조회해서 사용

이러한 방식을 세션이라고 하며, 세션을 위해 사용하는 쿠키를 세션 쿠키라고 함.

실제 배포용 서버에는 세션을 변수에 저장하지 않고, 서버가 멈추거나 재시작되면 메모리에 저장된 변수가 초기화되며, 서버의 메모리가 부족하면 세션을 저장하지 못하지 때문에 보통은 레디스나 맴캐시드 같은 데이터베이스에 넣어둔다.

추가적으로 위의 코드도 쿠키를 악용한 위협을 방어할 수 없음.

## 4.4 https와 http2

### https

https는 웹 서버에 SSL 암호화를 추가한다.

⇒ 중간자 공격(man in the middle) 이런거 써서 GET / POST 요청 가로채면 내용을 확인할 수 없다.

암호화를 적용하는 만큼, 그것을 인증해줄 수 있는 기관도 필요함.

인증서는 인증 기관에서 구입해야 함.

이 책에서는 인증서를 발급받는 방법에 대해서는 다루지 않지만, 아래 코드와 같이 https로 서버를 열 수 있다.

```jsx
const https = require('https')

https.createServer({
	cert: fs.readFileSync('도메인 인증서 경로') // 도메인 인증서
	key: fs.readFileSync('도메인 비밀 키 경로') // 도메인 비밀 키
	ca: [ // ca 인증서
		fs.readFileSync('상위 인증서 경로')
		fs.readFileSync('상위 인증서 경로')
	]
}, (req, res) => {

})
// 두 개의 인자를 받음
```

### http2

SSL 암호화와 더불어 최신 HTTP 프로토콜인 http/2를 사용할 수 있다.

기존 http1.1보다 훨씬 효율적으로 요청을 보냄.

http1.1은 파이프라인 기술을 통해 최적화하지만, 기본적으로 하나의 요청 하나의 응답 그리고 다시 하나의 요청 이렇게 하지만, http/2는 멀티플랙싱을 사용하여 한 번에 여러개의 요청과 여러개의 응답을 받을 수 있다.

https와 마찬가지로

```jsx
const http2 = require('http2')

http2.createSecureServer({

}, (req, res) => {})
```

## 4.5 cluster

cluster 모듈은 기본적으로 싱글 프로세스로 동작하는 노드가 CPU 코어를 모두 사용할 수 있도록 해주는 모듈

포트를 공유하는 노드 프로세스를 여러 개 둘 수 있어, 요청이 많이 들어왔을 때 병렬적으로 실행된 서버의 개수만큼 요청이 분산되게 할 수 있음.

example )

코어가 8개, 보통 하나의 코어만 사용

cluster를 사용하면 코어 하나당 노드 프로세스 하나가 돌아갈 수 있음. ⇒ 빠른 성능

하지만, 메모리를 공유하지 못하는 단점.

세션을 메모리에 저장하는 경우 문제가 있어 Radis를 도입하여 문제를 해결할 수 있음.

```jsx
const cluster = require('cluster')
const http = require('http')
const numCPUs = require('os').cpus().length

if (cluster.isMaster) {
  console.log('마스터 프로세스 아이디: ', process.pid)
  // CPU 개수만큼 워커를 생성
  for (let i = 0; i < numCPUs; ++i) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`${worker.process.pid}번 워커가 종료되었습니다.`)
    console.log(`code ${code} signal ${signal}`)
  })
} else {
  // 워커들이 포트에서 대기
  http.createServer((req, res) => {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' })
    res.write('<h1>Hello Node</h1>')
    res.end('<p>Hello Cluster</p>')
  }).listen(8080)

  console.log(`${process.pid}번 워커 실행`)
}
```

worker thread와 비슷하지만, 클러스터는 스레드가 아닌 프로세스임.

클러스터에는 마스터 프로세스와 워커 프로세스가 존재하는데

마스터 프로세스

- CPU 개수만큼 워커 프로세스를 만듦
- 포트에서 대기
- 요청이 들어오면 만들어진 워커 프로세스 요청 분배

워커 프로세스

- 실질적인 로직

⇒ 워커 프로세스가 존재하면 N번까지 오류가 발생해도 서버가 정상적으로 동작할 수 있음.

⇒ 종료된 워커를 다시 켜면 오류가 발생해도 계속 버틸 수 있음

```jsx
const cluster = require('cluster')
const http = require('http')
const numCPUs = require('os').cpus().length

if (cluster.isMaster) {
  console.log('마스터 프로세스 아이디: ', process.pid)
  // CPU 개수만큼 워커를 생성
  for (let i = 0; i < numCPUs; ++i) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`${worker.process.pid}번 워커가 종료되었습니다.`)
    console.log(`code ${code} signal ${signal}`)
    cluster.fork()
  })
} else {
  // 워커들이 포트에서 대기
  http.createServer((req, res) => {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' })
    res.write('<h1>Hello Node</h1>')
    res.end('<p>Hello Cluster</p>')
  }).listen(8080)

  console.log(`${process.pid}번 워커 실행`)
}
```

위와 같은 방식으로 오류를 처리하면 좋지 않음. 직접 오류를 찾아야 함. 그래도 예기치 못한 에러로 인한 서버 다운을 방지할 수 있어 클러스터링을 적용해두면 좋음.

실무에서는 pm2 등 모듈을 사용하여 cluster 기능을 사용

## 느낀점

- 왜 express 혹은 nestjs같은 라이브러리 / 프레임워크를 사용하는지 알겠다. NodeJS 만으로 백엔드 개발하려고 하면 정말 힘들거 같다.
- 그동안 radis를 어디에 사용하는지에 대해 몰랐는데 이번 기회에 알게 되어 좋다.
- 세션과 쿠키에 대해 잘 모르고 있었는데 이번 기획에 제대로 알게 된거 같다.
- 추가적으로 쿠키를 악용한 위협들이 있다고 하는데 XSS / CSRF 이런거 보안 공부 다시 해봐야겠다.
- SSL / TLS 암호화 방식에 대해 다시 공부해봐야겠다.
- HTTP의 connectless한 방식을 보완하기 위한 cookie / session 방식을 알게 된거 같다.
- 인증서 발급 받아서 HTTPS로 하는거 한 번도 안 해봤는데 이번 기회에 공부해봐야겠다.