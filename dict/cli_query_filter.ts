import * as readline from "readline";

import { BloomFilter } from "./filter";
import { filterData } from "./filter_data";

// The parameters of the filter are calculated using https://hur.st/bloomfilter/?n=42000&p=&m=64kiB&k=10
const hashCount = 10;

const filter = new BloomFilter({ hashCount, data: filterData });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

rl.on("line", (line: string) => {
  line = line.trim();
  if (filter.contains(line)) {
    console.log(1, line);
  } else {
    console.log(0, line);
  }
}).on("close", () => {});
