import { fast1a32 } from "fnv-plus";

export interface BloomFilterConstr {
  hashCount: number;
  /** filterBitCount must be a power of 2. */
  filterBitCount?: number;
  data?: number[];
}

/**
 * Generate bloom filter with all the words at standard input.
 */
export class BloomFilter {
  filter: Uint8Array;
  hashCount: number;
  hashMask: number;

  constructor({ hashCount, filterBitCount, data }: BloomFilterConstr) {
    if (filterBitCount) {
      this.filter = new Uint8Array(filterBitCount / 8);
      const n = filterBitCount;
      this._validatePower2(n);
      this.hashMask = (1 << Math.log2(n)) - 1;
    } else if (data) {
      this.filter = new Uint8Array(data);
      const n = data.length * 8;
      this._validatePower2(n);
      this.hashMask = (1 << Math.log2(n)) - 1;
    } else {
      throw Error("Cannot create bloom filter with such an input.");
    }
    this.hashCount = hashCount;
  }

  _validatePower2(n: number) {
    const b = Math.log2(n);
    if (b !== Math.floor(b)) {
      throw Error("Not a power of 2: " + n);
    }
  }

  insertString(s: string) {
    for (let i = 0; i < this.hashCount; i++) {
      const [ind, bitMask] = this._getAddress(s, i);
      this.filter[ind] = this.filter[ind] | bitMask;
    }
  }

  contains(s: string): boolean {
    for (let i = 0; i < this.hashCount; i++) {
      const [ind, bitMask] = this._getAddress(s, i);
      if (!(this.filter[ind] & bitMask)) {
        return false;
      }
    }
    return true;
  }

  _getAddress(s: string, i: number): [number, number] {
    // console.error("s", s, "i", i);
    const k = i + ":" + s; // Generate different hashes by adding a prefix.
    // console.error("k", k);
    const h = fast1a32(k);
    // console.error("h", h);
    const bitToSet = h & this.hashMask;
    // console.error("bitToSet", bitToSet);
    const fi = bitToSet >> 3;
    // console.error("fi", fi);
    const bitMask = 1 << (bitToSet & 7);
    // console.error("bitMask(2)", bitMask.toString(2));
    return [fi, bitMask];
  }

  formatAsArray(): number[] {
    const a: number[] = [];
    this.filter.forEach((v) => {
      a.push(v);
    });
    return a;
  }
}
