import { pipeline } from 'stream/promises'
import zlib from 'zlib'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

await pipeline(
  fs.createReadStream(`${__dirname}/a.txt`),
  zlib.createGzip(),
  fs.createWriteStream(`${__dirname}/c.txt.gz`)
)