import { fast1a32 } from "fnv-plus";

export interface BloomFilterGeneratorConstr {
  hashCount: number;
  /** filterBitCount must be a power of 2. */
  filterBitCount: number;
}

/**
 * Generate bloom filter with all the words at standard input.
 */
export class BloomFilterGenerator {
  filter: Uint8Array;
  hashCount: number;
  hashMask: number;

  constructor({ hashCount, filterBitCount }: BloomFilterGeneratorConstr) {
    this.filter = new Uint8Array(filterBitCount / 8);
    this.hashCount = hashCount;
    this.hashMask = (1 << Math.log2(filterBitCount)) - 1;
  }

  insertString(s: string) {
    for (let i = 0; i < this.hashCount; i++) {
      const k = i + ":" + s; // Generate different hashes by adding a prefix.
      const h = fast1a32(k);
      const bitToSet = h & this.hashMask;
      const fi = bitToSet >> 3;
      this.filter[fi] = this.filter[fi] | (1 << (bitToSet & 7));
    }
  }

  formatAsArray(): number[] {
    const a: number[] = [];
    this.filter.forEach((v) => {
      a.push(v);
    });
    return a;
  }
}
