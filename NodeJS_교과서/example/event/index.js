const EventEmitter = require('events')

const myEvent = new EventEmitter()
myEvent.addListener('event1', () => {
  console.log('이벤트 1 발생')
})

myEvent.on('event2', () => {
  console.log('이벤트 2 발생')
})

myEvent.on('event2', () => {
  console.log('이벤트 2 발생 2')
})

myEvent.emit('event1') // 이벤트 1 발생
myEvent.emit('event2') // 이벤트 2 발생, 이벤트 2 발생 2

myEvent.once('event3', () => {
  console.log('이벤트 3 발생')
})

myEvent.emit('event3')
myEvent.emit('event3') // once이기 때문에 한 번만 가능

myEvent.removeAllListeners('event2')
myEvent.emit('event2') // 이벤트 모두 삭제됨

const listener = () => {
  console.log('이벤트 4 발생')
}
myEvent.on('event4', listener)
myEvent.removeListener('event4', listener) // 특정 이벤트 리스너 삭제
myEvent.emit('event4') // 안 됨

console.log(myEvent.listenerCount('event1')) // 1