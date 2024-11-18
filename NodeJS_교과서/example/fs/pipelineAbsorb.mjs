import { pipeline } from "stream/promises";
import zlib from "zlib";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ac = new AbortController();
const signal = ac.signal;

setTimeout(() => ac.abort(), 1);

try {
  await pipeline(
    fs.createReadStream(`${__dirname}/a.txt`),
    zlib.createGzip(),
    fs.createWriteStream(`${__dirname}/d.txt.gz`),
    { signal }
  );
  console.log("Pipeline succeeded!");
} catch (error) {
  if (error.code === "ABORT_ERR") {
    console.error("The pipeline was aborted!");
  } else {
    console.error("Pipeline failed:", error);
  }
}