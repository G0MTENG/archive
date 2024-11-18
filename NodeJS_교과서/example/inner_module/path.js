const path = require('path')
const filename = __filename

// 경로 구분자 윈도우 -> '\' POISX -> '/'
console.log(`path.sep: ${path.sep}`)
// path.sep: /

// 환경 변수의 구분자
// process.env.PATH를 하면 여러 개의 경로가 구분자로 되어있는데
// 윈도우 -> ';', POSIX -> ':'
console.log(`path.delimiter: ${path.delimiter}`)
// path.delimiter: :

console.log('\n')
// 파일이 위치한 경로를 보여줌
console.log(`path.dirname(): ${path.dirname(filename)}`)
// path.dirname(): /Users/teng/archive/NodeJS_교과서/example/inner_module

// 파일의 확장자를 보여줌
console.log(`path.extname(): ${path.extname(filename)}`)
// path.extname(): .js

// 파일의 이름(확장자 포함)을 표시함 그리고 확장자를 빼고 싶다면 두 번째 인수로 확장자를 넣으면 됨
console.log(`path.basename(): ${path.basename(filename)}`)
// path.basename(): path.js
console.log(`path.basename - extname: ${path.basename(filename, path.extname(filename))}`)
// path.basename - extname: path

console.log('\n')
// 파일 경로를 root, dir, base, ext, name으로 파싱함
console.log(path.parse(filename))
/* 
{
  root: '/',
  dir: '/Users/teng/archive/NodeJS_교과서/example/inner_module',
  base: 'path.js',
  ext: '.js',
  name: 'path'
}
*/

// path.parse한 객체를 파일 경로로 합침
console.log(`path.format(): ${path.format({
  root: '/',
  dir: '/Users/teng/archive/NodeJS_교과서/example/inner_module',
  base: 'path2.js',
  ext: '.js',
  name: 'path2'
})}`)
// path.format(): /Users/teng/archive/NodeJS_교과서/example/inner_module/path2.js

// /나 \를  실수로 여러 번 사용했거나 혼용했을 때 정상적인 경로로 반환
console.log(`path.normalize(): ${path.normalize('//////////path.js')}`)
// path.normalize(): /path.js

console.log('\n')

// 파일의 경로가 상대 경로인지 절대 경로인지 판단해줌
console.log(`path.isAbsolute(/Users): ${path.isAbsolute('/Users')}`) // true
console.log(`path.isAbsolute(./home): ${path.isAbsolute('./home')}`) // false

console.log('\n')

// path.relative(기준경로, 비교경로) 기준경로에서 비교경로로 가는 방법을 알려줌
console.log(`path.relative(): ${path.relative(`${path.dirname(filename)}/os.js`, `${path.dirname(filename)}/path.js`)}`)
// path.relative(): ../path.js

// path.join(경로, ...) 여러 인수를 넣으면 하나의 경로로 합친다
// . -> 현재 | .. -> 부모
console.log(`path.join(): ${path.join(__dirname, '..', '..', '/users', '.', '/')}`)
// path.join(): /Users/teng/archive/NodeJS_교과서/users/

// path.resolve(경로, ...) join과 동일하지만 /를 만나면 절대 경로로 인식해서 앞의 경로를 무시함
console.log(`path.resolve(): ${path.resolve(__dirname, '..', 'users', '.', '/')}`)
// /