"use strict";
exports.__esModule = true;
exports.BloomFilterGenerator = void 0;
var readline = require("readline");
var fnv_plus_1 = require("fnv-plus");
// The parameters of the filter are calculated using https://hur.st/bloomfilter/?n=42000&p=&m=64kiB&k=10
var hashCount = 10;
// Use 64KB (2^19) bits
var filterBitCount = Math.pow(2, 19);
/**
 * Generate bloom filter with all the words at standard input.
 */
var BloomFilterGenerator = /** @class */ (function () {
    function BloomFilterGenerator(_a) {
        var hashCount = _a.hashCount, filterBitCount = _a.filterBitCount;
        this.filter = new Uint8Array(filterBitCount / 8);
        this.hashCount = hashCount;
        this.hashMask = (1 << Math.log2(filterBitCount)) - 1;
    }
    BloomFilterGenerator.prototype.insertString = function (s) {
        for (var i = 0; i < this.hashCount; i++) {
            var k = i + ":" + s; // Generate different hashes by adding a prefix.
            var h = (0, fnv_plus_1.fast1a32)(k);
            var bitToSet = h & this.hashMask;
            var fi = bitToSet >> 3;
            this.filter[fi] = this.filter[fi] | (1 << (bitToSet & 7));
        }
    };
    BloomFilterGenerator.prototype.formatAsArray = function () {
        var a = [];
        this.filter.forEach(function (v) {
            a.push(v);
        });
        return a;
    };
    return BloomFilterGenerator;
}());
exports.BloomFilterGenerator = BloomFilterGenerator;
var filter = new BloomFilterGenerator({ hashCount: hashCount, filterBitCount: filterBitCount });
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
rl.on("line", function (line) {
    line = line.trim();
    filter.insertString(line);
}).on("close", function () {
    console.log("const values = " + JSON.stringify(filter.formatAsArray()));
    console.log("const export filterData = Uint8Array(values)");
});
