const fs = require('fs').promises;

console.log('시작');

(async () => {
  const a = await fs.readFile(`${__dirname}/a.txt`);
  console.log(1, a);
  const b = await fs.readFile(`${__dirname}/a.txt`);
  console.log(2, b);
  const c = await fs.readFile(`${__dirname}/a.txt`);
  console.log(3, c);
})();

console.log('끝');