const {
  Worker,
  isMainThread,
  parentPort,
  workerData
} = require('worker_threads')

if (isMainThread) { // main thread
  const threads = new Set() // Set 자료구조를 통해서 thread를 관리
  for (let i = 0; i < 3; ++i) {
    threads.add(new Worker(__filename, {
      workerData: { start: i }
    }))
  }

  for (const worker of threads) {
    worker.on('message', message => console.log(message))
    worker.on('exit', () => {
      threads.delete(worker)
      
      if (threads.size === 0) {
        console.log('job done')
      }
    })
  }
} else { // worker
  const data = workerData // worker의 데이터 가져오기
  parentPort.postMessage(data.start + 100)
}