const util = require('util');

const dontUseFunc = util.deprecate((x, y) => {
  console.log(x + y)
}, 'dontUseFunc 함수는 deprecated되었으니 더 이상 사용하지 마세요!')
dontUseFunc(1, 2)
// 3
// (node:50503) DeprecationWarning: dontUseFunc 함수는 deprecated되었으니 더 이상 사용하지 마세요!
// (Use `node --trace-deprecation ...` to show where the warning was created)

const callbackFunc = (x, y, callback) => {
  try {
    const result = x + y // 계산 수행
    callback(null, result) // 첫 번째 인자는 에러(null), 두 번째는 결과
  } catch (error) {
    callback(error) // 에러 발생 시 에러를 전달
  }
}

const promiseFunc = util.promisify(callbackFunc)

;(async () => {
  try {
    const result = await promiseFunc(1, 2);
    console.log(result) // 3
  } catch (error) {
    console.error(error);
  }
})()