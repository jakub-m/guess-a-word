import * as readline from "readline";

import { BloomFilter } from "./filter";

// The parameters of the filter are calculated using https://hur.st/bloomfilter/?n=42000&p=&m=64kiB&k=10
const hashCount = 10;
// Use 64KB (2^19) bits
const filterBitCount = 65536 * 8;

const filter = new BloomFilter({ hashCount, filterBitCount });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

rl.on("line", (line: string) => {
  line = line.trim();
  filter.insertString(line);
}).on("close", () => {
  console.log(
    "export const filterData = " + JSON.stringify(filter.formatAsArray())
  );
});
